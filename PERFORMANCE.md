# 鹿城学院论坛 - 性能优化配置

## 已完成的优化

### 1. 网络层优化
- ✅ 添加 `preconnect` 预连接到关键域名（cdn.jsdelivr.net, supabase, wzvtc.cn）
- ✅ 添加 `dns-prefetch` DNS 预解析
- ✅ 异步加载 Supabase JS (`defer` 属性)
- ✅ 预加载关键资源 (config.js)

### 2. 数据加载优化
- ✅ forum.html: 并行加载用户数据和帖子数据 (Promise.all)
- ✅ forum.html: 限制帖子查询范围为最近30天，最多100条
- ✅ forum.html: 限制回复数查询为前50条
- ✅ post.html: 并行加载用户信息和帖子
- ✅ post.html: 限制回复数为50条
- ✅ post.html: 作者头像异步加载，不阻塞渲染

### 3. 渲染优化
- ✅ 减少首屏数据量，提升首屏加载速度
- ✅ 延迟加载非关键数据（如作者头像）

## 建议的进一步优化

### GitHub Pages 配置
在仓库根目录添加 `_headers` 文件启用缓存：

```
/*
  Cache-Control: public, max-age=3600

/*.html
  Cache-Control: public, max-age=0, must-revalidate

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable
```

### Supabase 优化建议
1. 为常用查询添加索引：
   - posts.created_at
   - posts.category
   - posts.is_deleted
   - replies.post_id

2. 启用 Supabase CDN 缓存

### 图片优化
1. 使用 WebP 格式图片
2. 添加图片懒加载 (loading="lazy")
3. 使用响应式图片 (srcset)

### 代码分割
如果网站继续增长，考虑：
1. 将 CSS 提取到单独文件
2. 按需加载非首屏组件
