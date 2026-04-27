const https = require('https');
const fs = require('fs');
const path = require('path');

// 确保 libs 目录存在
if (!fs.existsSync('libs')) {
  fs.mkdirSync('libs', { recursive: true });
}

// 下载 adapter.min.js
const file = fs.createWriteStream('libs/adapter.min.js');
https.get('https://res.wx.qq.com/open/js/adapter-min.1.7.0.js', (response) => {
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('adapter.min.js 下载完成');
  });
}).on('error', (err) => {
  fs.unlink('libs/adapter.min.js');
  console.error('下载失败，创建简单适配器');
  
  // 创建一个简单的适配器
  const simpleAdapter = `
// 简单适配器
(function() {
  if (typeof window === 'undefined') return;
  
  // 模拟 vivo 小游戏环境
  window.vivo = {
    getSystemInfoSync: function() {
      return {
        platform: 'vivo',
        version: '1.0.0',
        system: 'Android',
        pixelRatio: 2,
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight
      };
    },
    onError: function(callback) {
      window.addEventListener('error', callback);
    },
    offError: function(callback) {
      window.removeEventListener('error', callback);
    }
  };
})();
  `;
  
  fs.writeFileSync('libs/adapter.min.js', simpleAdapter);
  console.log('已创建简单的适配器文件');
});