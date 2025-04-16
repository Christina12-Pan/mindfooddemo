# MindFood 原型项目

## 项目简介

MindFood是一个健康饮食和血糖管理应用程序的原型。该项目包含以下主要功能模块：

1. **AI助手功能**：提供智能问答和饮食建议
2. **个人资料页面**：展示用户基本信息和健康数据
3. **社区页面**：用户交流和分享健康信息
4. **食谱详情**：展示适合血糖管理的健康食谱

## 项目结构

项目文件组织如下：

```
├── mindfood_prototype.html      # 主HTML文件，包含所有页面和功能
├── README.md                    # 项目文档
│
├── 【AI助手模块】
│   ├── add_nav_fix.js           # 导航栏修复加载器
│   └── ai_remove_nav_fixed.js   # 导航栏修复主脚本
│
├── 【个人资料模块】
│   ├── update_profile_update.js # 个人资料更新主脚本
│   ├── add_update_profile.js    # 个人资料更新加载器
│   └── update_profile_style.css # 个人资料样式文件
│
├── 【页面调整与修复】
│   ├── clean_html_file.js       # HTML文件修复脚本
│   ├── replace_navigation.js    # 导航替换脚本
│   ├── simple_fix.js            # 通用修复脚本
│   ├── fix_community_nav.js     # 社区导航修复脚本
│   ├── fix_nav_spacing.js       # 导航间距修复脚本
│   └── fix_problematic_html.js  # HTML问题修复脚本
│
└── 【其他功能】
    ├── create_community_page.js # 社区页面创建脚本
    ├── 项目清理指南.md           # 项目文件清理指南
    ├── cleanup_files.js         # 文件清理分析脚本
    └── cleanup.bat              # 文件清理批处理脚本
```

## 主要功能模块

### 1. AI助手模块

AI助手页面提供智能对话功能，帮助用户解答健康和饮食问题。

**核心文件**:
- `add_nav_fix.js` - 加载AI助手页面导航栏修复脚本
- `ai_remove_nav_fixed.js` - 修复AI助手页面底部导航栏遮挡输入框的问题

**工作原理**:
- CSS样式隐藏导航栏
- DOM元素移除
- 输入区域位置调整
- 聊天容器底部间距优化

### 2. 个人资料模块

展示和更新用户个人资料页面，采用新的UI设计。

**核心文件**:
- `update_profile_update.js` - 个人资料页面更新主脚本
- `add_update_profile.js` - 个人资料更新加载器
- `update_profile_style.css` - 个人资料样式文件

**功能特点**:
- 用户信息卡片展示
- 健康成就展示
- 订阅信息管理
- 健康问卷表单
- 功能菜单导航

### 3. 页面调整与修复

包含各种页面布局调整和问题修复的脚本。

**主要文件**:
- `clean_html_file.js` - 修复HTML文件中的异常字符问题
- `replace_navigation.js` - 导航栏替换功能
- `simple_fix.js` - 通用修复脚本
- `fix_community_nav.js` - 社区页面导航修复
- `fix_nav_spacing.js` - 导航间距调整
- `fix_problematic_html.js` - HTML问题修复

### 4. 其他功能

其他辅助功能和工具脚本。

**主要文件**:
- `create_community_page.js` - 创建社区页面脚本
- 项目维护相关文件(清理指南、清理脚本等)

## 使用说明

1. 打开 `mindfood_prototype.html` 文件查看完整原型
2. 通过点击底部导航栏切换不同页面:
   - 主页(Home)
   - 社区(Community)
   - 日志(Log)
   - 个人资料(Profile)
   - AI助手(AI Assistant)

## 维护说明

1. **页面修改**:
   - 所有页面内容都包含在 `mindfood_prototype.html` 文件中
   - 页面样式和交互逻辑通过JavaScript脚本添加

2. **脚本加载顺序**:
   - 保持脚本在HTML底部的加载顺序不变
   - 优先加载基础功能脚本，然后是扩展功能和修复脚本

3. **问题修复**:
   - 如遇页面布局问题，优先检查对应页面的修复脚本
   - 如修复无效，可以参考 `项目清理指南.md` 中的备份文件恢复
   
4. **项目清理**:
   - 参考 `项目清理指南.md` 了解项目文件结构
   - 使用 `cleanup.bat` 清理冗余文件(执行前请确保备份) 
 
 
 
 
 
 
 
 
 
 
 
 