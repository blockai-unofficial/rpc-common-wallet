# RPC Common Wallet

A [Common Wallet](https://github.com/blockai/abstract-common-wallet) interface for the Bitcoin Core RPC.

```js
var RpcClient = require('bitcoind-rpc')

var config = {
  protocol: 'http',
  user: 'rpcuser',
  pass: 'rpcpassword',
  host: '127.0.0.1',
  port: '18332'
}

var rpc = new RpcClient(config)

var rpcCommonWallet = require('rpc-common-wallet')({
  rpc: rpc
})
```
