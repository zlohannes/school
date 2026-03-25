// 腾讯云 CloudBase 云函数 - Supabase 代理
// 路径: supabase-proxy/index.js

const https = require('https');
const url = require('url');

const SUPABASE_URL = 'tsxnnzcteavcpowsbaye.supabase.co';
const SUPABASE_KEY = 'sb_publishable_SHiGnxlUonmmOFKytrt-Lg_8DXAWJJl';

exports.main = async (event, context) => {
  // 获取请求信息
  const httpMethod = event.httpMethod || 'GET';
  const requestPath = event.path || '/rest/v1/posts';
  const queryString = Object.entries(event.queryString || {})
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
  
  const fullPath = queryString 
    ? `${requestPath}?${queryString}` 
    : requestPath;
  
  const options = {
    hostname: SUPABASE_URL,
    port: 443,
    path: fullPath,
    method: httpMethod,
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          resolve({
            statusCode: res.statusCode,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(parsedData)
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            body: data
          });
        }
      });
    });
    
    req.on('error', (error) => {
      resolve({
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: error.message })
      });
    });
    
    if (event.body) {
      req.write(event.body);
    }
    
    req.end();
  });
};
