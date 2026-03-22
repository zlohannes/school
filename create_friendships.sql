-- 创建好友关系表
CREATE TABLE IF NOT EXISTS friendships (
  id SERIAL PRIMARY KEY,
  requester_username TEXT NOT NULL,
  recipient_username TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'rejected'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(requester_username, recipient_username)
);

-- 创建索引
CREATE INDEX idx_friendships_requester ON friendships(requester_username);
CREATE INDEX idx_friendships_recipient ON friendships(recipient_username);
CREATE INDEX idx_friendships_status ON friendships(status);