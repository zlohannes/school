# Supabase 性能优化方案

## 已实施的优化

### 1. 数据库连接优化
- 禁用 session 持久化和自动刷新（减少请求）
- 添加请求头标识
- 添加 5-8 秒超时控制，防止长时间等待

### 2. 查询优化
- 只查询必要字段（减少数据传输）
- 限制返回数量：帖子 50 条（最近7天），回复 30 条
- 添加 `eq('is_deleted',false)` 过滤条件
- 优化排序：先按置顶，再按时间

### 3. 数据缓存
- 帖子列表缓存 1 分钟（CACHE_TTL: 60000ms）
- 缓存期间先显示缓存数据，后台异步刷新
- 网络失败时使用缓存数据

### 4. 按需加载
- 回复数改为按需查询（浏览到当前页时才加载）
- 作者头像异步加载，不阻塞页面渲染
- 通知检查不阻塞页面加载

### 5. 并行请求
- 用户信息和帖子并行加载（Promise.all）
- 减少总体等待时间

## 建议的进一步优化

### 方案 1：使用 Supabase 国内代理（推荐）
在 Cloudflare Workers 或 Vercel Edge 部署代理：

```javascript
// workers.js - Cloudflare Workers 代理
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const targetUrl = 'https://tsxnnzcteavcpowsbaye.supabase.co' + url.pathname + url.search;
    
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body
    });
    
    return new Response(response.body, {
      status: response.status,
      headers: {
        ...response.headers,
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
};
```

### 方案 2：切换到国内数据库
考虑使用：
- **LeanCloud**（国内节点，有免费额度）
- **Bmob**（国内 BaaS）
- **阿里云 Tablestore**（按量付费）
- **腾讯云 CloudBase**（有免费额度）

### 方案 3：添加静态数据缓存层
使用 Cloudflare KV 或本地 Storage 缓存：
- 帖子列表缓存 5 分钟
- 热门帖子预加载
- 减少直接查询 Supabase

### 方案 4：数据库索引优化
在 Supabase 控制台添加索引：
```sql
-- 帖子查询优化
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_deleted ON posts(is_deleted);
CREATE INDEX idx_posts_pinned ON posts(is_pinned DESC);

-- 回复查询优化
CREATE INDEX idx_replies_post_id ON replies(post_id);
CREATE INDEX idx_replies_created_at ON replies(created_at);

-- 用户查询优化
CREATE INDEX idx_users_username ON users(username);
```

## 当前优化效果

| 指标 | 优化前 | 优化后 |
|------|--------|--------|
| 首屏加载数据量 | 全部帖子 | 最近7天50条 |
| 查询字段 | 全部字段 | 必要字段 |
| 超时控制 | 无 | 5-8秒 |
| 数据缓存 | 无 | 1分钟 |
| 回复数加载 | 初始化全部加载 | 按需加载 |

## 用户端建议

在公告中添加提示：
```
⚠️ 服务器位于海外，如遇加载缓慢请耐心等待。
建议：使用 WiFi 网络访问，或开启代理工具。
```
