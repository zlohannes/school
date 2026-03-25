// Vercel Edge Function - Supabase 代理
// 路径: api/proxy.js

export default async function handler(request) {
  const SUPABASE_URL = 'https://tsxnnzcteavcpowsbaye.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_SHiGnxlUonmmOFKytrt-Lg_8DXAWJJl';
  
  const url = new URL(request.url);
  const targetPath = url.pathname.replace('/api/proxy', '') + url.search;
  const targetUrl = SUPABASE_URL + targetPath;
  
  // 复制请求头
  const headers = new Headers(request.headers);
  headers.set('apikey', SUPABASE_KEY);
  headers.set('Authorization', `Bearer ${SUPABASE_KEY}`);
  
  // 处理 CORS 预检
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'apikey, Authorization, Content-Type, X-Client-Info',
        'Access-Control-Max-Age': '86400'
      }
    });
  }
  
  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: headers,
      body: request.body
    });
    
    // 复制响应头并添加 CORS
    const responseHeaders = new Headers(response.headers);
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: '代理请求失败', 
      message: error.message 
    }), {
      status: 502,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export const config = {
  runtime: 'edge'
};
