var pull = require('pull-stream')
var defer = require('pull-defer')

module.exports = function () {
  var deferred = defer.source()

  var sink = pull.collect(function (err, buffer) {
    if (err) return deferred.abort(err)
    deferred.resolve(pull.values([buffer]))
  })

  return function (read) {
    sink(read)
    return deferred
  }
}
