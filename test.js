const test = require('tape')
const pull = require('pull-stream')
const buffer = require('./')

test('should buffer values', (t) => {
  const values = Array(random(1, 1000)).fill(0).map(_ => random(1, 5000))

  pull(
    pull.values(values),
    // Multiply by 2 over some random time
    pull.asyncMap((n, cb) => setTimeout(() => cb(null, n * 2), random(1, 10))),
    buffer(),
    pull.collect((err, data) => {
      t.ifError(err)
      // Ensure the buffer only streams a single value
      t.equal(data.length, 1)
      // Ensure buffered values are as expected
      values.forEach((value, i) => t.equal(data[0][i], value * 2))
      t.end()
    })
  )
})

function random (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}
