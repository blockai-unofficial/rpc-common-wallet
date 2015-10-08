module.exports = function (options, callback) {
  var rpc = options.rpc
  var async = require('async')
  var testCommonWallet = require('test-common-wallet')

  var commonBlockchain = options.commonBlockchain
  var network = options.network

  var getPrimaryAddress = function (callback) {
    var primaryAddress
    rpc.listTransactions(function (err, res) {
      if (err) { } // TODO
      var transactions = res.result
      var incomingTransactions = transactions.filter(function (tx) { return tx.amount > 0 })
      var addressesOldestFirst = incomingTransactions.map(function (tx) { return tx.address }).reverse()
      async.each(addressesOldestFirst, function (address, next) {
        if (primaryAddress) {
          next()
        }
        rpc.signMessage(address, 'test', function (err, res) {
          if (!err) {
            primaryAddress = address
          }
          next()
        })
      }, function (err) {
        if (err) { } // TODO
        rpc.dumpPrivKey(primaryAddress, function (err, res) {
          var wif = res.result
          callback(err, primaryAddress, wif)
        })
      })
    })
  }

  getPrimaryAddress(function (err, address, wif) {
    if (err) {} // TODO

    var commonWallet = testCommonWallet({
      wif: wif,
      network: network,
      commonBlockchain: commonBlockchain
    })

    callback(false, commonWallet)
  })
}
