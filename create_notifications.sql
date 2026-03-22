-- 创建消息通知表
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  recipient_username TEXT NOT NULL,
  sender_username TEXT,
  sender_nickname TEXT,
  type TEXT NOT NULL, -- 'reply', 'like', 'mention'
  post_id INTEGER,
  post_title TEXT,
  content TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引提高查询效率
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON notifications(recipient_username);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(recipient_username, is_read);