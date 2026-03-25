// config.js - 腾讯云 CloudBase 配置
// 使用腾讯云国内云函数，访问速度快

// 腾讯云 CloudBase 环境ID
window.CLOUDBASE_ENV = 'school-7g0r6pyl5a3b9046';

// 云函数基础地址
window.CLOUD_FUNCTIONS_URL = 'https://school-7g0r6pyl5a3b9046.service.tcloudbase.com';

// 管理员注册码配置
window.ADMIN_CODE_HASH = '6fa1c8e18a3707fcfd6ae105f9c747a49d50b1e3497849df91adce7ef98cf47b';
window.PASSWORD_SALT = 'lc_forum_2026_secure';

// 腾讯云数据库调用封装
window.callCloudFunction = async function(name, data) {
  const url = `${window.CLOUD_FUNCTIONS_URL}/${name}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
};
