// 云函数：获取帖子列表
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  const { category, limit = 50 } = event;
  
  try {
    let query = db.collection('posts').where({
      is_deleted: _.neq(true)
    });
    
    if (category) {
      query = query.where({ category });
    }
    
    const posts = await query
      .orderBy('is_pinned', 'desc')
      .orderBy('created_at', 'desc')
      .limit(limit)
      .get();
    
    // 获取回复数
    const postsWithReplies = await Promise.all(posts.data.map(async (post) => {
      const replies = await db.collection('replies').where({ post_id: post._id }).count();
      return {
        ...post,
        id: post._id,
        reply_count: replies.total
      };
    }));
    
    return { code: 0, data: postsWithReplies };
  } catch (err) {
    return { code: -1, message: err.message };
  }
};
