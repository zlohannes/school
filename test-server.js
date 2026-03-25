const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/data/posts.json',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', data.substring(0, 300));
  });
});

req.on('error', (e) => {
  console.error('Error:', e.message);
});

req.end();
