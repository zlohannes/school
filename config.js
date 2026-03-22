// config.js - 使用 Vercel 代理加速 Supabase
// 国内用户访问更快

// ============================================
// 部署平台选择（取消注释你要用的）
// ============================================

// 方案 1: GitHub Pages（默认，直接连 Supabase）
// window.SUPABASE_URL = 'https://tsxnnzcteavcpowsbaye.supabase.co';

// 方案 2: Vercel 代理（推荐国内用户）
// 把请求通过 Vercel 香港节点转发到 Supabase
window.SUPABASE_URL = 'https://school-seven-sigma.vercel.app/api/proxy';

// ============================================
// Supabase 配置（不变）
// ============================================
window.SUPABASE_ANON_KEY = 'sb_publishable_SHiGnxlUonmmOFKytrt-Lg_8DXAWJJl';

// ============================================
// 管理员注册码配置
// ============================================
window.ADMIN_CODE_HASH = '6fa1c8e18a3707fcfd6ae105f9c747a49d50b1e3497849df91adce7ef98cf47b';
window.PASSABASE_SALT = 'lc_forum_2026_secure';
