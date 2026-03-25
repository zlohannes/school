# Supabase 国内加速代理部署教程

## 方案对比

| 方案 | 成本 | 难度 | 效果 | 推荐度 |
|------|------|------|------|--------|
| Cloudflare Workers | 免费 | 简单 | ⭐⭐⭐⭐ | ✅ 推荐 |
| Vercel Edge | 免费 | 简单 | ⭐⭐⭐⭐ | ✅ 推荐 |
| 国内 BaaS 迁移 | 免费-付费 | 复杂 | ⭐⭐⭐⭐⭐ | 长期方案 |

---

## 方案一：Cloudflare Workers（推荐）

### 步骤 1：注册 Cloudflare
1. 打开 https://dash.cloudflare.com/sign-up
2. 使用邮箱注册（可以用 QQ 邮箱）
3. 验证邮箱

### 步骤 2：创建 Workers 服务
1. 登录后点击左侧菜单 **Workers & Pages**
2. 点击 **Create application**
3. 选择 **Create Worker**
4. 输入服务名称，比如 `supabase-proxy`
5. 点击 **Deploy**

### 步骤 3：编辑代码
1. 部署成功后点击 **Edit code**
2. 删除默认代码
3. 复制 `worker.js` 中的全部代码粘贴进去
4. 点击 **Save and deploy**

### 步骤 4：获取代理地址
1. 页面上方会显示你的 Workers 地址
2. 格式：`https://supabase-proxy.你的用户名.workers.dev`
3. 复制这个地址

### 步骤 5：更新网站配置
1. 打开 `config.js`
2. 将 `SUPABASE_URL` 改为你的 Workers 地址：
```javascript
window.SUPABASE_URL = 'https://supabase-proxy.你的用户名.workers.dev';
```
3. 重新部署网站

---

## 方案二：Vercel Edge（备选）

### 步骤 1：注册 Vercel
1. 打开 https://vercel.com/signup
2. 使用 GitHub 账号登录

### 步骤 2：创建项目
1. 点击 **Add New Project**
2. 选择 **Import Git Repository** 或手动创建
3. 创建文件 `api/proxy.js`：

```javascript
export default async function handler(request) {
  const SUPABASE_URL = 'https://tsxnnzcteavcpowsbaye.supabase.co';
  const targetUrl = SUPABASE_URL + new URL(request.url).pathname;
  
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

export const config = {
  runtime: 'edge'
};
```

### 步骤 3：部署
1. 提交代码到 GitHub
2. Vercel 会自动部署
3. 获取域名如 `https://你的项目.vercel.app`

---

## 方案三：切换到国内 BaaS（长期方案）

### LeanCloud（推荐）
- 官网：https://leancloud.cn
- 国内节点，速度快
- 免费额度：每天 3 万次请求
- 迁移成本：需要重写数据层代码

### Bmob
- 官网：https://www.bmob.cn
- 国内 BaaS
- 免费额度较宽松

### 腾讯云 CloudBase
- 官网：https://cloud.tencent.com/product/tcb
- 国内节点
- 有免费额度

---

## 测试代理是否生效

部署完成后，在浏览器控制台测试：

```javascript
// 测试直接连接 Supabase
fetch('https://tsxnnzcteavcpowsbaye.supabase.co/rest/v1/posts?select=id&limit=1')
  .then(r => console.log('直接连接:', r.status))

// 测试代理连接
fetch('https://你的-proxy.workers.dev/rest/v1/posts?select=id&limit=1')
  .then(r => console.log('代理连接:', r.status))
```

---

## 故障排查

### 问题 1：Workers 返回 502
- 检查 SUPABASE_URL 和 ANON_KEY 是否正确
- 检查 Workers 代码是否完整复制

### 问题 2：CORS 错误
- 确保 Workers 代码中包含 CORS 头设置
- 清除浏览器缓存重试

### 问题 3：还是慢
- Cloudflare Workers 免费版也有速度限制
- 考虑升级到付费版或使用 Vercel Edge

---

## 预计效果

| 指标 | 优化前 | 优化后 |
|------|--------|--------|
| 首屏加载 | 3-8 秒 | 1-3 秒 |
| API 响应 | 500-2000ms | 100-500ms |
| 用户体验 | 卡顿 | 流畅 |
