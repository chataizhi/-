const fs = require('fs');
const { createCanvas } = require('canvas');

// 创建一个 512x512 的图标
const canvas = createCanvas(512, 512);
const ctx = canvas.getContext('2d');

// 背景
const gradient = ctx.createLinearGradient(0, 0, 512, 512);
gradient.addColorStop(0, '#4A4AFF');
gradient.addColorStop(1, '#8A2BE2');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 512, 512);

// 星星
ctx.fillStyle = '#FFD700';
ctx.beginPath();
ctx.arc(256, 256, 200, 0, Math.PI * 2);
ctx.fill();

// 星星光芒
ctx.strokeStyle = '#FFFFFF';
ctx.lineWidth = 20;
for (let i = 0; i < 8; i++) {
  const angle = (Math.PI * 2 * i) / 8;
  ctx.beginPath();
  ctx.moveTo(256, 256);
  ctx.lineTo(
    256 + Math.cos(angle) * 250,
    256 + Math.sin(angle) * 250
  );
  ctx.stroke();
}

// 文字
ctx.fillStyle = '#000000';
ctx.font = 'bold 100px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('⭐', 256, 256);

// 保存
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('common/icon.png', buffer);
console.log('图标已创建: common/icon.png');