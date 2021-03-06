# pull-buffer

[![Build Status](https://travis-ci.org/alanshaw/pull-buffer.svg?branch=master)](https://travis-ci.org/alanshaw/pull-buffer) [![dependencies Status](https://david-dm.org/alanshaw/pull-buffer/status.svg)](https://david-dm.org/alanshaw/pull-buffer)

> Buffer a pull stream and then stream the buffer as a single value.
> 
> Like `pull.collect` but instead of a sink this is a through.

## Usage

```js

const pull = require('pull-stream')
const buffer = require('pull-buffer')

pull(
  pull.values([1, 2, 3]),
  // Multiply by 2 after a second
  pull.asyncMap((n, cb) => setTimeout(() => cb(null, n * 2), 1000)),
  // Buffer the values in memory
  buffer(),
  // Collect the buffered contents.
  // Only one value will be streamed and then the stream will end
  pull.collect((err, data) => {
    console.log(data) // [[2, 4, 6]]
  })
)
```

## Contribute

Feel free to dive in! [Open an issue](https://github.com/alanshaw/pull-buffer/issues/new) or submit PRs.

## License

[MIT](LICENSE) © Alan Shaw
