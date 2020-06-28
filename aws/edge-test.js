const assert  = require('assert');
const handler = require('./edge').handler;

// return a mock request
const mock = (uri) => {
  return {
    Records: [{
      cf: {
        request: {
          uri: uri
        },
      }
    }],
  };
}

// NB: I don't care that these don't (necessarily) finish sequentially

// assert that subdirectory pages are rewritten to the appropriate index page
handler(mock('/about/'), {}, (err, request) => {
  assert.strictEqual(request.uri, '/about/index.html');
  console.log('OK');
});

// assert that pages which lack a trailing `/` are properly rewritten
handler(mock('/about'), {}, (err, request) => {
  assert.strictEqual(request.uri, '/about/index.html');
  console.log('OK');
});

// assert that direct file paths are not rewritten
handler(mock('/images/image.jpg'), {}, (err, request) => {
  assert.strictEqual(request.uri, '/images/image.jpg');
  console.log('OK');
});
