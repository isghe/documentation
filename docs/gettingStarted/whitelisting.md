# Securing with whitelists
Developers rely on Infura's Dashboard view to understand their Dapp's API usage and how best they can optimize. If you
are sending API requests from a web browser or other client-side application which does not have the ability to secure
your `PROJECT_SECRET`, whitelisting can be used to prevent a third party from using your `Project ID` on another website.

### Ethereum Addresses
If you know your application will only be querying data from specific smart contracts or address sources, add those addresses to your Ethereum Address Whitelist.

When an address is added to the whitelist, any API requests which query addresses not in the whitelist are rejected.

```
curl  -H 'Content-Type: application/json' \
      -X POST \
      -d '{"id":1, "jsonrpc": "2.0", "method": "eth_getBalance","params":["WHITELISTED_ADDRESS", "latest"]]}' \
      https://mainnet.infura.io/v3/YOUR-PROJECT-ID
```


### User-Agents
If you are distributing a product which embeds an API key and you have the ability to set a custom User-Agent (e.g. an Electron app, iOS or Android app),
we recommend adding the known User-Agent to your whitelist.

When a User-Agent is added to the whitelist, any API requests which originate from other platforms will be rejected.


### HTTP Origin
To prevent a third party from using your Project ID on their website, you can whitelist approved HTTP Origins from where it can be used.

If you are deploying your application to `mydapp.example.com`, adding `mydapp.example.com` to your HTTP Origin whitelist will ensure
any traffic that does not include `Origin: mydapp.example.com` in the HTTP request will be rejected.


### Best Practices
Protecting a client-side credential can be simple or complex depending on the scenario. Use the whitelist features that best fit your application. The list of items below are recommendations we'd like to make to help you make informed decisions for your application.

* Whenever you are making API requests and can ensure the `PROJECT_SECRET` will not be exposed publicly, include it in your requests.
* Don't just use the User-Agent or Origin whitelist, use both whenever possible.
* Don't reuse Project IDs across projects.
* Create a new Project ID for each application. This allows you to whitelist the contract addresses relevant to that application.