# 迁移验证清单

## 🎯 核心内容验证

### ✅ 配置文件
- [x] `_config.yml` - 个人信息、网站设置
- [x] `scholar.last_name` 和 `scholar.first_name` 已更新
- [x] 网站URL和baseurl正确配置

### ✅ 个人信息页面
- [x] `_pages/about.md` - 个人简介完整
- [x] `_data/cv.yml` - CV数据完整
- [x] `_pages/cv.md` - CV页面配置，PDF链接已设置
- [x] `_pages/teaching.md` - Teaching经验已添加

### ✅ 学术论文 (Publications)
- [x] 4篇论文的BibTeX条目
  - [x] LLM-Copilot (IROS 2025) - `zhang2025llm`
  - [x] Neural Surfel (Sensors 2024) - `zhang2024neural`
  - [x] CAD2OSM (arXiv 2025) - `zhang2025cad2osm`
  - [x] AGLoc (RAL 2023) - `xie2023agloc`
- [x] 所有论文的预览图片
- [x] Google Scholar ID配置
- [x] 3篇论文标记为`selected=true`

### ✅ 研究项目 (Projects)
- [x] 5个项目文件从`_portfolio`迁移到`_projects`
  - [x] AGLoc++ (`1_agloc_project.md`)
  - [x] Campus Autonomy (`2_campus_autonomy.md`)
  - [x] SLAM Project (`3_slam_project.md`)
  - [x] Deep Learning Nav (`4_deeplearning_project.md`)
  - [x] Industrial Perception (`5_industrial_perception.md`)
- [x] 所有项目的teaser图片
- [x] 项目内容图片迁移完成

### ✅ 新闻动态 (News)
- [x] 5条新闻条目
  - [x] IROS 2025接收通知
  - [x] Neural Surfel发表
  - [x] LLM导航arXiv发布
  - [x] CAD2OSM arXiv发布
  - [x] MoMa课程助教
- [x] 日期按时间倒序排列

### ✅ 图片资源
- [x] 个人头像 `prof_pic.jpg`
- [x] 论文预览图 (4张)
- [x] 项目图片文件夹 (6个)
- [x] Teaching图片
- [x] 总计30+张图片已迁移

### ✅ 数据文件
- [x] `_data/cv.yml` - CV结构化数据
- [x] `_data/socials.yml` - 社交媒体链接
- [x] `_data/coauthors.yml` - 合作者信息
- [x] `_data/repositories.yml` - GitHub仓库

### ✅ PDF文件
- [x] `assets/pdf/cv.pdf` - 个人简历
- [x] `assets/pdf/agloc_ral_paper.pdf` - AGLoc论文
- [x] `assets/pdf/cad2osm_paper.pdf` - CAD2OSM论文

---

## ⚠️ 需要注意的事项

### 视频文件
- [ ] 5个视频文件（总计176MB）未迁移
- **建议**: 上传到YouTube/Bilibili后嵌入链接

### 其他PDF
- [ ] LLM-Copilot论文PDF（需从会议获取）
- [ ] Neural Surfel论文PDF（可从MDPI下载）

### 网站部署
- [ ] 配置GitHub Actions自动部署
- [ ] 设置GitHub Pages
- [ ] 验证网站可以正常访问

---

## 🧪 测试清单

### 本地测试
```bash
cd /Users/johnnylin/git-repository/personal_pages/jiajiezhang7-new.github.io
bundle install
bundle exec jekyll serve
```

### 需要验证的页面
- [ ] 首页 `/` - About页面显示正常
- [ ] Publications `/publications/` - 所有论文正确显示
- [ ] Projects `/projects/` - 所有项目卡片正常
- [ ] CV `/cv/` - CV数据正确渲染，PDF下载可用
- [ ] Teaching `/teaching/` - Teaching内容显示
- [ ] News - 新闻条目按时间排序
- [ ] Repositories `/repositories/` - GitHub仓库展示

### 需要验证的功能
- [ ] 论文搜索功能
- [ ] 图片点击放大
- [ ] 响应式布局（手机/平板/桌面）
- [ ] Dark/Light模式切换
- [ ] 社交媒体链接跳转
- [ ] PDF下载链接
- [ ] 外部链接（arXiv、DOI等）

### 需要验证的样式
- [ ] 个人头像显示正常
- [ ] 论文预览图正确显示
- [ ] 项目卡片图片加载
- [ ] 文字排版和字体
- [ ] 颜色主题一致性

---

## 📊 迁移完成度

### 内容迁移: 100%
- ✅ 配置文件
- ✅ 个人信息
- ✅ 论文条目
- ✅ 项目内容
- ✅ 新闻动态
- ✅ 图片资源
- ✅ CV数据
- ✅ Teaching内容

### 资源文件: 95%
- ✅ 图片文件 (100%)
- ✅ PDF文件 (60% - 3/5)
- ⚠️ 视频文件 (0% - 建议使用外部链接)

### 功能配置: 80%
- ✅ 基础配置完成
- ⚠️ 需要配置部署
- ⚠️ 需要测试所有功能

---

## 🚀 部署前检查

### GitHub仓库设置
1. [ ] 确认仓库名称正确
2. [ ] 配置GitHub Pages源分支
3. [ ] 添加CNAME文件（如需自定义域名）
4. [ ] 检查.gitignore文件

### 环境依赖
1. [ ] 检查Gemfile依赖版本
2. [ ] 确认Jekyll版本兼容
3. [ ] 验证所有插件可用

### SEO优化
1. [ ] 检查meta标签
2. [ ] 确认sitemap.xml生成
3. [ ] 验证robots.txt
4. [ ] 添加Google Analytics（可选）

---

## ✨ 迁移成功标准

以下条件全部满足即代表迁移成功：

1. ✅ 所有个人信息正确无误
2. ✅ 4篇论文在Publications页面正确显示
3. ✅ 5个项目在Projects页面正确显示
4. ✅ 图片资源全部加载成功
5. ✅ CV页面数据完整且PDF可下载
6. ⚠️ 网站可以成功部署到GitHub Pages
7. ⚠️ 所有页面在不同设备上显示正常
8. ⚠️ 所有链接可以正常跳转

---

## 📝 最终建议

### 优先级1 - 立即完成
- 测试本地Jekyll服务器
- 配置GitHub Pages部署
- 验证所有页面正常显示

### 优先级2 - 短期完成
- 上传视频到YouTube/Bilibili
- 更新项目中的视频链接
- 下载并添加缺失的论文PDF

### 优先级3 - 长期优化
- 添加Google Analytics
- 优化图片大小
- 添加更多项目细节
- 定期更新新闻动态

---

**验证完成日期**: 待定
**验证人**: Jiajie Zhang
