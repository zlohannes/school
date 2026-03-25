// config.js - 使用 Cloudflare Workers 代理加速
// 部署代理后，取消注释下面的配置

// ============================================
// 方案 A：直接连接 Supabase（当前使用）
// ============================================
window.SUPABASE_URL = 'https://tsxnnzcteavcpowsbaye.supabase.co';
window.SUPABASE_ANON_KEY = 'sb_publishable_SHiGnxlUonmmOFKytrt-Lg_8DXAWJJl';

// ============================================
// 方案 B：使用 Cloudflare Workers 代理（推荐）
// 部署 worker.js 后，注释掉上面的配置，使用下面的
// ============================================
// window.SUPABASE_URL = 'https://你的-workers-地址.你的子域名.workers.dev';
// window.SUPABASE_ANON_KEY = 'sb_publishable_SHiGnxlUonmmOFKytrt-Lg_8DXAWJJl';

// ============================================
// 管理员注册码配置
// ============================================
window.ADMIN_CODE_HASH = '6fa1c8e18a3707fcfd6ae105f9c747a49d50b1e3497849df91adce7ef98cf47b';
window.PASSWORD_SALT = 'lc_forum_2026_secure';
