var test = require('tape')
var RpcClient = require('bitcoind-rpc')
var env = require('node-env-file')
env('./.env', { raise: false })

var rpcuser = process.env.rpcuser
var rpcpassword = process.env.rpcpassword

var config = {
  protocol: 'http',
  user: rpcuser,
  pass: rpcpassword,
  host: '127.0.0.1',
  port: '18332'
}

var rpc = new RpcClient(config)

var testnetCommonBlockchain = require('rpc-common-blockchain')({
  rpc: rpc
})

require('./')({
  network: 'testnet',
  commonBlockchain: testnetCommonBlockchain,
  rpc: rpc
}, function (err, rpcCommonWallet) {
  if (err) {
    // TODO
  }
  var commonWalletTests = require('abstract-common-wallet/tests')
  var common = {
    setup: function (t, cb) {
      cb(null, rpcCommonWallet)
    },
    teardown: function (t, commonWallet, cb) {
      cb()
    }
  }

  commonWalletTests(test, '', common)
})
