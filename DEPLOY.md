# GitHub Pages 部署指南

## 步骤 1：在 GitHub 创建仓库

1. 打开 https://github.com/new
2. 仓库名称：`school-forum`（或你喜欢的名字）
3. 选择 **Public**（公开）
4. 点击 **Create repository**

## 步骤 2：上传代码到 GitHub

### 方法一：直接上传（最简单）

1. 在创建的仓库页面，点击 **uploading an existing file**
2. 把 `school-main` 文件夹里的所有文件拖进去
3. 点击 **Commit changes**

### 方法二：使用 Git 命令行

```bash
# 进入项目目录
cd school-main

# 初始化 git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 关联远程仓库（把 YOUR_USERNAME 换成你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/school-forum.git

# 推送
git branch -M main
git push -u origin main
```

## 步骤 3：启用 GitHub Pages

1. 在仓库页面，点击 **Settings**
2. 左侧菜单点击 **Pages**
3. **Source** 选择 **Deploy from a branch**
4. **Branch** 选择 **main**，文件夹选择 **/(root)**
5. 点击 **Save**

## 步骤 4：访问网站

等待 1-2 分钟后，访问：
```
https://YOUR_USERNAME.github.io/school-forum/
```

把 `YOUR_USERNAME` 换成你的 GitHub 用户名。

## 更新网站

以后修改代码后，重新上传文件或执行：
```bash
git add .
git commit -m "更新内容"
git push
```

GitHub Pages 会自动更新！

---

## 你的仓库地址

根据你的用户名 `zlohannes`，部署后地址将是：
```
https://zlohannes.github.io/school-forum/
```