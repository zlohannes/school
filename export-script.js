// 手动导出 Supabase 数据到 JSON
// 使用方法：
// 1. 把这段代码保存为 export.js
// 2. 在浏览器控制台运行，或者使用 Node.js 运行
// 3. 把生成的数据复制到 posts.json

const SUPABASE_URL = 'https://tsxnnzcteavcpowsbaye.supabase.co';
const SUPABASE_KEY = 'sb_publishable_SHiGnxlUonmmOFKytrt-Lg_8DXAWJJl';

async function exportPosts() {
  // 获取帖子
  const postsRes = await fetch(`${SUPABASE_URL}/rest/v1/posts?select=*&is_deleted=eq.false&order=created_at.desc&limit=200`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });
  const posts = await postsRes.json();
  
  // 获取回复数
  const repliesRes = await fetch(`${SUPABASE_URL}/rest/v1/replies?select=post_id`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });
  const replies = await repliesRes.json();
  
  // 统计回复数
  const replyCounts = {};
  replies.forEach(r => {
    replyCounts[r.post_id] = (replyCounts[r.post_id] || 0) + 1;
  });
  
  // 合并数据
  const postsWithReplies = posts.map(p => ({
    ...p,
    reply_count: replyCounts[p.id] || 0
  }));
  
  const output = {
    updated_at: new Date().toISOString(),
    count: postsWithReplies.length,
    posts: postsWithReplies
  };
  
  console.log(JSON.stringify(output, null, 2));
  
  // 复制到剪贴板
  const text = JSON.stringify(output, null, 2);
  navigator.clipboard.writeText(text).then(() => {
    alert('数据已复制到剪贴板！请粘贴到 posts.json 文件');
  });
}

exportPosts();
