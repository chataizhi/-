const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// --- 配置 ---
const OUTPUT_DIR = 'dist'; // 输出目录
const FILES_TO_COPY = [
    'game.html',
    'manifest.json',
    'rpkg-config.json',
    'package.json'
];
const DIRS_TO_COPY = ['common', 'libs'];

// --- 工具函数：确保目录存在 ---
function ensureDirSync(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`📁 创建目录: ${dirPath}`);
    }
}

// --- 步骤 1: 清理旧的 dist 文件夹 (可选，防止旧文件干扰) ---
if (fs.existsSync(OUTPUT_DIR)) {
    console.log(`🧹 清理旧的 ${OUTPUT_DIR} 文件夹...`);
    fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
}
ensureDirSync(OUTPUT_DIR);

// --- 步骤 2: 复制核心文件 ---
console.log('📄 复制核心文件...');
FILES_TO_COPY.forEach(file => {
    if (fs.existsSync(file)) {
        fs.copyFileSync(file, path.join(OUTPUT_DIR, file));
        console.log(`  - 复制 ${file}`);
    } else {
        console.warn(`  ⚠️ 警告: 未找到文件 ${file}`);
    }
});

// --- 步骤 3: 复制目录 ---
console.log('📂 复制目录...');
DIRS_TO_COPY.forEach(dir => {
    if (fs.existsSync(dir)) {
        const dest = path.join(OUTPUT_DIR, dir);
        // 递归复制目录 (Node.js 16.7+ 可以用 fs.cpSync，旧版用下面的方法)
        if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true, force: true });
        
        // 使用 readdir + copyFile 来兼容旧版 Node.js
        const copyRecursive = (src, dest) => {
            const exists = fs.existsSync(src);
            const stats = exists && fs.statSync(src);
            const isDirectory = exists && stats.isDirectory();
            if (isDirectory) {
                if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
                fs.readdirSync(src).forEach(childItemName => {
                    copyRecursive(path.join(src, childItemName), path.join(dest, childItemName));
                });
            } else {
                fs.copyFileSync(src, dest);
            }
        };
        
        copyRecursive(dir, dest);
        console.log(`  - 复制 ${dir} 目录`);
    } else {
        console.warn(`  ⚠️ 警告: 未找到目录 ${dir}`);
    }
});

// --- 步骤 4: 执行原生构建命令 (如果有) ---
// 如果你的项目原本是用 npm run build 打包的，保留下面这行
// exec('npm run build', (error, stdout, stderr) => {
//     if (error) {
//         console.error(`❌ 构建错误: ${error.message}`);
//         return;
//     }
//     console.log('✅ 构建成功!');
// });

console.log(`\n🎉 准备就绪! 所有文件已放入 ${OUTPUT_DIR} 目录，可以提交到 GitHub 了。`);