<div align="center">

# 🚀 UI/UX Pro-Max Skill 基准测试

**使用 Claude Code SDK + GLM 4.7 自动生成 100 个高质量落地页**

[![Pages Generated](https://img.shields.io/badge/页面数量-100-brightgreen?style=for-the-badge)](./pages)
[![Model](https://img.shields.io/badge/模型-GLM_4.7-blue?style=for-the-badge)](https://open.bigmodel.cn)
[![Skill](https://img.shields.io/badge/Skill-ui--ux--pro--max-purple?style=for-the-badge)](./.claude/skills/ui-ux-pro-max)

<br/>

[English](./README_EN.md) · **简体中文**

</div>

---

## ✨ 项目简介

这是一个使用 **Claude Code SDK** 调用 **GLM 4.7** 大模型，结合 **ui-ux-pro-max** Skill 自动批量生成高质量网站落地页的基准测试项目。

> 💡 **核心理念**：一句话 Prompt → 一个完整网站

通过简单的提示词，AI 可以自动生成包含完整设计系统、响应式布局、精美动画的落地页。

| 类别 | 页面 |
|------|------|
| **SaaS** | saas, micro-saas, productivity-tool, remote-work |
| **电商** | ecommerce, ecommerce-luxury, subscription-box, marketplace |
| **金融** | fintech-crypto, financial-dashboard, banking-traditional, insurance |
| **科技** | ai-chatbot, nft-web3, blockchain-defi, quantum-computing, cybersecurity |
| **医疗** | healthcare-app, mental-health, medical-clinic, pharmacy, dental, veterinary |
| **教育** | educational-app, online-course, coding-bootcamp, language-learning, edutainment |
| **创意** | creative-agency, portfolio-personal, design-system, photography, generative-art |
| **生活服务** | restaurant-food, coffee-shop, bakery-cafe, florist, beauty-spa |
| **专业服务** | legal-services, consulting, marketing-agency, event-management |
| **出行旅游** | travel-tourism, hotel-hospitality, airline |
| **房产建筑** | real-estate, construction, architecture-interior, coworking |
| **汽车交通** | automotive, ev-charging, logistics-delivery |
| **前沿科技** | space-tech, biotech, biohacking, drone-fleet, spatial-computing, robotics-automation |
| **媒体娱乐** | news-media, magazine-blog, podcast, music-streaming, video-streaming, gaming |
| **社交社区** | social-media-app, dating-app, membership, creator-economy |
| **公共服务** | government-public-service, non-profit, church |
| **其他** | smart-home, agriculture, senior-care, childcare, sports, museum, theater, wedding-event, newsletter, knowledge-base, hyperlocal, digital-products, conference, job-board, freelancer, cleaning, home-services, luxury-premium, sustainable-energy, sustainability-esg, vr-ar-platform, developer-tool, analytics-dashboard, micro-credentials, pet-tech, brewery-winery |


## 脚本架构

```
┌─────────────────────────────────────────────────────────────┐
│                      generate.ts                            │
│                   (生成脚本入口)                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   prompts.json ──────► Claude Code SDK ──────► pages/       │
│   (100个提示词)          │                    (100个页面)    │
│                          │                                  │
│                          ▼                                  │
│                   ┌─────────────┐                          │
│                   │   GLM 4.7   │ ◄── 智谱 AI 大模型        │
│                   └─────────────┘                          │
│                          │                                  │
│                          ▼                                  │
│              ┌──────────────────────┐                      │
│              │  ui-ux-pro-max Skill │ ◄── 设计规范/组件库   │
│              └──────────────────────┘                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 核心组件

| 组件 | 说明 |
|------|------|
| **Claude Code SDK** | Anthropic 官方 SDK，用于调用 Claude 风格的 AI 接口 |
| **GLM 4.7** | 智谱 AI 的大语言模型，通过兼容 API 接入 |
| **ui-ux-pro-max** | 自定义 Skill，包含设计规范、组件库和最佳实践 |
| **Playwright** | 可选的浏览器工具，用于页面截图等操作 |


## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 配置环境变量

```bash
# 如果使用其他模型，需要在 generate.ts 中修改对应的 baseUrl, model，apikey
export GLM_API_KEY="your-glm-api-key"
```

### 运行生成

```bash
npm run generate
```

> ⚠️ **注意**：生成 100 个页面需要较长时间，脚本支持断点续跑（已完成的会自动跳过）


## 🔗 相关链接

- [智谱 AI 开放平台](https://open.bigmodel.cn)
- [Claude Code SDK](https://github.com/anthropics/claude-agent-sdk)
- [GLM 4.7 兼容 API 文档](https://open.bigmodel.cn/dev/api/anthropic)

## 📄 许可证

MIT

---

<div align="center">

**Made with ❤️ using GLM 4.7 + Claude Code SDK**

</div>

## 🎁 支持项目

如果你也想试试 GLM 4.7， 新用户首次购买 5 折优惠，通过下方链接购买在优惠基础上再享受 10% 的优惠。

[![GLM 购买](./assets/image.png)](https://www.bigmodel.cn/glm-coding?ic=HLOSYBYNPL)