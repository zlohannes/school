// 云函数：用户登录
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  const { username, password } = event;
  
  try {
    const user = await db.collection('users').where({ username }).get();
    
    if (user.data.length === 0) {
      return { code: -1, message: '用户名不存在' };
    }
    
    const userData = user.data[0];
    
    if (userData.password !== password) {
      return { code: -1, message: '密码错误' };
    }
    
    if (userData.is_banned) {
      return { code: -1, message: '账号已被封禁' };
    }
    
    return {
      code: 0,
      data: {
        username: userData.username,
        nickname: userData.nickname,
        role: userData.role,
        realName: userData.real_name
      }
    };
  } catch (err) {
    return { code: -1, message: err.message };
  }
};
