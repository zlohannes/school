// 云函数：用户注册
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  const { username, nickname, password, real_name, major, gender, role } = event;
  
  try {
    // 检查用户名是否存在
    const existUser = await db.collection('users').where({ username }).get();
    if (existUser.data.length > 0) {
      return { code: -1, message: '用户名已存在' };
    }
    
    // 创建用户
    await db.collection('users').add({
      data: {
        username,
        nickname: nickname || username,
        password, // 应该加密
        real_name,
        major,
        gender,
        role,
        created_at: db.serverDate(),
        is_banned: false
      }
    });
    
    return { code: 0, message: '注册成功' };
  } catch (err) {
    return { code: -1, message: err.message };
  }
};
