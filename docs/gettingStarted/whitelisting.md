# Securing With Whitelists
If you are sending API requests from a web browser or other client-side application which does not have the ability to secure
your `Project Secret`, whitelisting can be used to prevent a third party from using your `Project ID` on another website.


### Understanding Whitelist Behavior
- If a project has no whitelists enabled, any request will be accepted.
- As soon as any whitelist entries are added, all requests must pass each whitelist type.
- Each whitelist type is "AND"ed together
- Multiple entries of the same type are "OR"ed.

#### Example

**Scenario:** Alice whitelisted the `User-Agent` of her mobile application and the `Origin` where her web app is hosted.

**User-Agent Whitelist entry:** `com.example.aliceapp`

**Origin Whitelist Entry:** `aliceapp.example.com`

**Result:**
Both Alice's mobile app AND her website are allowed to use the same Project ID. If Alice created a new website under
`aliceawesomeapp.example.com`, she would need to add this new Origin to the whitelist to allow the Project ID to
function on the new site.


### User-Agents
If you are distributing a product which embeds an API key and you have the ability to set a custom User-Agent (e.g. an Electron app, iOS or Android app),
we recommend adding the known User-Agent to your whitelist.

When a User-Agent is added to the whitelist, any API requests which originate from other platforms will be rejected.

#### Matching Behavior
The User-Agent whitelist utilizes partial string matching. If the whitelisted string is present in the request's full User-Agent, it is registered as a match.

#### Example

**Whitelist entry:** `com.example.dapp`

**Request's User-Agent:** `com.example.dapp/v1.2.1 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36`

**Result:**: Request is **allowed** and all other user-agent requests are rejected


### HTTP Origin
To prevent a third party from using your Project ID on their website, you can whitelist approved HTTP Origins from where it can be used.

If you are deploying your application to `mydapp.example.com`, adding `mydapp.example.com` to your HTTP Origin whitelist will ensure
any traffic that does not include `Origin: mydapp.example.com` in the HTTP request will be rejected.

#### Matching Behavior
HTTP Origin matching supports wildcard subdomain patterns similarly to TLS certificates.

#### Example

**Whitelist entry:** `*.example.com`

**Request's Origin Header:** `myapp.example.com`

**Result:**: Request is **allowed**. Any requests from origins not matching `*.example.com` are requests are rejected


### Ethereum Addresses
If you know your application will only be querying data from specific smart contracts or address sources, add those addresses to your Ethereum Address Whitelist.

When an address is added to the whitelist, any API requests which query addresses not in the whitelist are rejected.


#### Whitelist Compatible Request Methods
The following RPC methods take an Ethereum address paramter and thus are compatible with whitelisting.
- eth_call
- eth_estimateGas
- eth_getLogs
- eth_getBalance
- eth_getCode
- eth_getStorageAt
- eth_getTransactionCount


#### Example

**Whitelist entry:** `0xfe05a3e72235c9f92fd9f2282f41a8154d6d342b`

**Request:**
```
curl  -H 'Content-Type: application/json' \
      -X POST \
      -d '{"id":1, "jsonrpc": "2.0", "method": "eth_getBalance","params":["0xfe05a3e72235c9f92fd9f2282f41a8154d6d342b", "latest"]]}' \
      https://mainnet.infura.io/v3/YOUR-PROJECT-ID
```

**Result:**
Request is **allowed**. Any [compatible request methods](#compatible-request-methods) which include other addresses as a parameter will be rejected.


### Best Practices
Protecting a client-side credential can be simple or complex depending on the scenario. Use the whitelist features that best fit your application. The list of items below are recommendations we'd like to make to help you make informed decisions for your application.

* Whenever you are making API requests and can ensure the `PROJECT_SECRET` will not be exposed publicly, include it in your requests.
* Don't just use the User-Agent or Origin whitelist, use both whenever possible.
* Don't reuse Project IDs across projects.
* Create a new Project ID for each application. This allows you to whitelist the contract addresses relevant to that application.
* **Never** expose your `PROJECT_SECRET` in client-side code such as Javascript imported into a webpage or iOS or Android apps. Use the other options for securing public project IDs instead.