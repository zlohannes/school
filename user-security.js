// 用户数据加密/解密工具
// 在所有 HTML 文件的 <head> 中引入此脚本

const USER_DATA_KEY = 'forum_users_encrypted';
const ADMIN_KEY = 'forum_admin_key'; // 管理员密钥

// 简单的加密函数（生产环境应使用更强的加密）
function encryptData(data, key) {
  try {
    const json = JSON.stringify(data);
    let encrypted = '';
    for (let i = 0; i < json.length; i++) {
      encrypted += String.fromCharCode(json.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return btoa(encrypted); // Base64 编码
  } catch(e) {
    return json;
  }
}

function decryptData(encrypted, key) {
  try {
    const json = atob(encrypted); // Base64 解码
    let decrypted = '';
    for (let i = 0; i < json.length; i++) {
      decrypted += String.fromCharCode(json.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return JSON.parse(decrypted);
  } catch(e) {
    return null;
  }
}

// 获取用户数据（需要管理员密钥）
function getUsersSecure(adminKey) {
  if (!adminKey || adminKey !== 'zrw521..') {
    console.warn('无权限访问用户数据');
    return null;
  }
  
  const encrypted = localStorage.getItem(USER_DATA_KEY);
  if (!encrypted) return [];
  
  return decryptData(encrypted, adminKey) || [];
}

// 保存用户数据（自动加密）
function saveUsersSecure(users) {
  const encrypted = encryptData(users, 'zrw521..');
  localStorage.setItem(USER_DATA_KEY, encrypted);
}

// 获取用户数据（不含密码，用于前端显示）
function getUsersPublic() {
  const encrypted = localStorage.getItem(USER_DATA_KEY);
  if (!encrypted) return [];
  
  const users = decryptData(encrypted, 'zrw521..') || [];
  // 移除密码字段
  return users.map(u => ({
    ...u,
    password: undefined
  }));
}
