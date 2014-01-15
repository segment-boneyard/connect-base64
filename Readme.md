
# connect-base64

  Connect middleware for decoding base64 requests from a querystring parameter and adding them to the request body

  [![Build Status](https://travis-ci.org/segmentio/connect-base64.png?branch=master)](https://travis-ci.org/segmentio/connect-base64)

## Usage

### connect-base64([key])

  Takes a string `key`, or uses the `data` parameter by default. The key is read from the querystring and then used as the request body.

```js
var base64 = require('connect-base64')
var express = require('express');
var request = require('superagent');

var app = express()
  .use(base64())
  .all('/', function (req, res) {
    res.send(req.body);
  });

request(app)
  .get('/')
  .query({ data: new Buffer('test').toString('base64') })
  .expect(200, done); // response: 'test'
```

## License

(The MIT License)

Copyright (c) 2014 Segment.io &lt;team@segment.io&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.