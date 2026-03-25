// 云函数：发布帖子
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  const { title, content, category, author, author_nickname, is_anonymous } = event;
  
  try {
    const result = await db.collection('posts').add({
      data: {
        title,
        content,
        category,
        author,
        author_nickname: is_anonymous ? '匿名用户' : author_nickname,
        is_anonymous,
        likes: 0,
        is_pinned: false,
        is_deleted: false,
        created_at: db.serverDate()
      }
    });
    
    return { code: 0, data: { id: result._id } };
  } catch (err) {
    return { code: -1, message: err.message };
  }
};
