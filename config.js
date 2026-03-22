// Public config for GitHub Pages (safe: publishable/anon key only). Do NOT put service_role/secret here.
// You can rotate keys anytime from Supabase dashboard.
window.SUPABASE_URL = 'https://tsxnnzcteavcpowsbaye.supabase.co';
window.SUPABASE_ANON_KEY = 'sb_publishable_SHiGnxlUonmmOFKytrt-Lg_8DXAWJJl';

// ============================================
// 管理员注册码配置
// ============================================
// 安全说明：这里存储的是注册码的 SHA-256 哈希值，不是明文密码。
// 即使有人看到这段代码，也无法反推出原始注册码。
//
// 默认注册码：LuchengAdmin2026!
// 强烈建议你更换为自己的注册码！
//
// 如何生成新的哈希值：
// 1. 打开浏览器控制台（F12）
// 2. 粘贴以下代码并回车（把 '你的新密码' 换成你的实际密码）：
//    (async () => { const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('你的新密码')); console.log(Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2,'0')).join('')); })();
// 3. 复制输出的哈希值，替换下面的 ADMIN_CODE_HASH
// ============================================
window.ADMIN_CODE_HASH = '6fa1c8e18a3707fcfd6ae105f9c747a49d50b1e3497849df91adce7ef98cf47b'; // 默认注册码: LuchengAdmin2026!

// 密码加密盐值（增加破解难度，可自定义）
window.PASSWORD_SALT = 'lc_forum_2026_secure';
