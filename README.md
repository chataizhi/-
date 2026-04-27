# 奇幻接星星 - vivo 小游戏

一个基于 HTML5 Canvas 的接星星游戏，适配 vivo 小游戏平台。

## 项目结构

```
.
├── .github/workflows/      # GitHub Actions 配置
│   └── build-vivo.yml
├── common/                 # 资源文件
│   └── icon.png           # 游戏图标
├── dist/                   # 构建输出目录
├── game.html              # 游戏主文件
├── manifest.json          # vivo 小游戏配置文件
└── README.md             # 项目说明
```

## 本地开发

1. 将游戏文件放在 `dist/` 目录
2. 确保有 `manifest.json` 配置文件
3. 安装 vivo-minigame CLI：`npm install -g @vivo-minigame/cli`
4. 进入 dist 目录：`cd dist`
5. 下载 adapter：`wget -O libs/adapter.min.js https://res.wx.qq.com/open/js/adapter-min.1.7.0.js`
6. 测试构建：`mg build --alliance`

## GitHub Actions 自动打包

### 自动触发条件
- 推送以 `v` 开头的标签（如 `v1.0.0`）
- 在 Actions 页面手动触发

### 设置签名证书（用于发布版）

1. 获取 vivo 小游戏的签名证书文件：
   - `certificate.pem` - 证书文件
   - `private.pem` - 私钥文件

2. 在 GitHub 仓库设置 Secrets：
   - 进入仓库 Settings → Secrets and variables → Actions
   - 添加以下 Secrets：
     - `VIVO_CERTIFICATE` - certificate.pem 文件内容
     - `VIVO_PRIVATE_KEY` - private.pem 文件内容

### 构建输出
- 测试版：`.rpk` 文件（未签名）
- 发布版：`.rpk` 文件（已签名）
- 自动上传到 GitHub Actions Artifacts
- 打标签时会自动创建 Release

## 游戏说明

### 游戏玩法
1. 左右滑动屏幕控制平台移动
2. 接住下落的星星获得分数
3. 不同颜色星星分数不同
4. 星星掉落底部扣除生命值
5. 生命值为0时游戏结束

### 难度等级
- 简单：星星下落速度慢
- 中等：正常速度
- 困难：快速下落

## 技术支持
- 游戏引擎：HTML5 Canvas
- 平台适配：vivo 小游戏 adapter
- 构建工具：vivo-minigame CLI
- CI/CD：GitHub Actions

## 许可证
MIT License