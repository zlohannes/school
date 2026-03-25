// Cloudflare Workers 代理 - 为 Supabase 提供国内加速
// 部署步骤：
// 1. 注册 Cloudflare 账号 https://dash.cloudflare.com
// 2. 创建 Workers 服务
// 3. 复制此代码并部署
// 4. 将 SUPABASE_PROXY_URL 更新为 Workers 地址

export default {
  async fetch(request, env, ctx) {
    // 你的 Supabase 配置
    const SUPABASE_URL = 'https://tsxnnzcteavcpowsbaye.supabase.co';
    const SUPABASE_ANON_KEY = 'sb_publishable_SHiGnxlUonmmOFKytrt-Lg_8DXAWJJl';
    
    // 获取请求路径
    const url = new URL(request.url);
    const targetPath = url.pathname + url.search;
    const targetUrl = SUPABASE_URL + targetPath;
    
    // 复制请求头
    const headers = new Headers(request.headers);
    headers.set('apikey', SUPABASE_ANON_KEY);
    headers.set('Authorization', `Bearer ${SUPABASE_ANON_KEY}`);
    
    // 处理 CORS 预检请求
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
      // 发起请求到 Supabase
      const response = await fetch(targetUrl, {
        method: request.method,
        headers: headers,
        body: request.body
      });
      
      // 复制响应头并添加 CORS
      const responseHeaders = new Headers(response.headers);
      responseHeaders.set('Access-Control-Allow-Origin', '*');
      
      // 返回响应
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
};
