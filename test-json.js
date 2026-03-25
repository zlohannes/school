const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'public', 'data', 'posts.json');
console.log('读取文件:', jsonPath);

try {
  const content = fs.readFileSync(jsonPath, 'utf8');
  console.log('文件内容 (前200字符):');
  console.log(content.substring(0, 200));
  
  const data = JSON.parse(content);
  console.log('JSON解析成功, 帖子数:', data.posts ? data.posts.length : 0);
} catch(e) {
  console.error('错误:', e.message);
}
