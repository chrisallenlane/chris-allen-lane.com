'use strict';

const path = require('path');

// This has been adapted from the following:
//   https://go.aws/2Y80mKg
exports.handler = (event, context, callback) => {

  // Extract the request from the CloudFront event that is sent to Lambda@Edge 
  const request = event.Records[0].cf.request;

  // Extract the original URI from the request
  let url = request.uri;

  // Extract the URI file extension
  const ext = path.extname(url);

  // If the URI lacks a file extension and does not end with a trailing slash,
  // append a trailing slash, such that:
  //
  //   `/about`   => `/about/`
  //   `/img.png` => `/img.png`
  //
  if (ext === '' && (url.substr(url.length - 1)) !== '/') {
    url += '/';
  }

  // Match any '/' that occurs at the end of a URI. Replace it with a default index
  request.uri = url.replace(/\/$/, '\/index.html');

  // Return to CloudFront
  return callback(null, request);
};
