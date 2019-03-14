# Introduction

Infura's websocket endpoint provides support for Pub/Sub API as well as JSON-RPC filter support.
Additionally, the regular Ethereum JSON-RPC API is also supported over a websocket connection and documented in the 'EXAMPLE' portion for each 'Ethereum JSON-RPC' call.

All examples in this reference section uses `wscat`, but will work with any tool that supports websockets.

Some tools you can use for making these requests
- [wscat](https://github.com/websockets/wscat)
- [Advanced Rest Client](https://install.advancedrestclient.com/)

#### EXAMPLE
The following is an example showing a connection to the websocket endpoint and using subscriptions through web3.js 1.0.

NOTE: web3.js 1.0.0-beta.34 has an open issue with request headers. (https://github.com/ethereum/web3.js/issues/1559)
Users will have to revert to version 1.0.0-beta.33 to avoid this issue.

```js
const Web3 = require("web3");

let web3 = new Web3(
  // Replace YOUR-PROJECT-ID with a Project ID from your Infura Dashboard
  new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws/v3/YOUR-PROJECT-ID")
);

const instance = new web3.eth.Contract(<abi>, <address>);

instance.getPastEvents(
    "SomeEvent",
    { fromBlock: "latest", toBlock: "latest" },
    (errors, events) => {
        if (!errors) {
            // process events
        }
    }
);
```
