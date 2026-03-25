# 静态化方案配置说明

## 工作原理

```
Supabase(海外) → GitHub Actions(每30分钟) → posts.json → GitHub Pages(国内CDN)
                      ↓
                用户访问论坛 → 直接读取 posts.json → ⚡ 秒开
                      ↓
                发帖/回复 → 直接连 Supabase → 稍慢但可用
```

## 文件说明

| 文件 | 作用 |
|------|------|
| `.github/workflows/sync-posts.yml` | GitHub Actions 定时任务 |
| `public/data/posts.json` | 帖子数据静态文件 |
| `forum.html` | 优先读取静态 JSON |

## 配置步骤

### 1. 设置 GitHub Secrets

在 GitHub 仓库页面：
1. Settings → Secrets and variables → Actions
2. 点击 **New repository secret**
3. 添加两个 secret：

```
Name: SUPABASE_URL
Value: https://tsxnnzcteavcpowsbaye.supabase.co
```

```
Name: SUPABASE_KEY
Value: sb_publishable_SHiGnxlUonmmOFKytrt-Lg_8DXAWJJl
```

### 2. 启用 GitHub Actions

1. 仓库页面点击 **Actions**
2. 点击 **I understand my workflows, go ahead and enable them**
3. 找到 **Sync Posts to JSON** 工作流
4. 点击 **Run workflow** 手动运行一次

### 3. 等待同步完成

- 首次运行需要 2-3 分钟
- 完成后 `public/data/posts.json` 会被更新
- 之后每 30 分钟自动同步一次

## 效果

| 场景 | 优化前 | 优化后 |
|------|--------|--------|
| 打开论坛首页 | 3-8 秒 | ⚡ 0.5-1 秒 |
| 切换分页 | 1-3 秒 | ⚡ 瞬间 |
| 搜索帖子 | 2-5 秒 | ⚡ 瞬间 |
| 发帖/回复 | 2-5 秒 | 2-5 秒（不变） |

## 数据延迟

- 新帖子最多延迟 30 分钟显示在列表
- 回复数最多延迟 30 分钟更新
- 发帖/回复功能是实时的（直接连 Supabase）

## 故障排查

### 帖子列表空白
1. 检查 Actions 是否运行成功
2. 检查 `public/data/posts.json` 是否存在
3. 浏览器 F12 看控制台是否有报错

### Actions 运行失败
1. 检查 Secrets 是否设置正确
2. 检查 Supabase 是否可访问
3. 查看 Actions 日志找错误

### 数据不同步
1. 手动触发 Actions 运行
2. 检查 Supabase 是否有新数据
3. 检查 posts.json 是否被提交

## 关闭静态化（回退）

如果出现问题，修改 `forum.html`：

```javascript
var USE_STATIC_JSON=false; // 改为 false
```

这样就会直接读取 Supabase，和原来一样。
