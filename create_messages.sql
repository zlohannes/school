-- 创建私信表
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  sender_username TEXT NOT NULL,
  sender_nickname TEXT,
  recipient_username TEXT NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_messages_sender ON messages(sender_username);
CREATE INDEX idx_messages_recipient ON messages(recipient_username);
CREATE INDEX idx_messages_unread ON messages(recipient_username, is_read);