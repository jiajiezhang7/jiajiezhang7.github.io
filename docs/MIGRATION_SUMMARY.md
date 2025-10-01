# 个人主页迁移总结

## 迁移日期

2025-09-30

## 迁移概述

从旧仓库 `jiajiezhang7.github.io` (Academic Pages模板) 迁移至新仓库 `jiajiezhang7-new.github.io` (al-folio模板)

---

## ✅ 已完成的迁移

### 1. 基本配置 (\_config.yml)

- ✅ 个人信息（姓名、邮箱、学校等）
- ✅ 网站描述和关键词
- ✅ Jekyll Scholar配置（姓名更新为Zhang, Jiajie）
- ✅ 主题和布局设置

### 2. 个人信息 (About页面)

- ✅ 个人简介和研究背景
- ✅ 研究兴趣描述
- ✅ 教育背景
- ✅ 当前工作内容

### 3. 学术论文 (Publications)

已将所有论文从Markdown格式转换为BibTeX格式：

#### 已迁移的论文：

1. **LLM-Copilot (IROS 2025)** - `zhang2025llm`

   - ✅ BibTeX条目
   - ✅ 预览图片：`llm-copilot-teaser.png`
   - ✅ Google Scholar ID
   - ✅ 标记为selected

2. **Neural Surfel (Sensors 2024)** - `zhang2024neural`

   - ✅ BibTeX条目
   - ✅ 预览图片：`neural-surfel-teaser.png` 和 `neural-surfel-overview.png`
   - ✅ DOI和完整引用信息
   - ✅ 标记为selected

3. **CAD2OSM (arXiv 2025)** - `zhang2025cad2osm`

   - ✅ BibTeX条目
   - ✅ 预览图片：`cad2osm-teaser.png`
   - ✅ 完整的CAD2OSM图片文件夹
   - ✅ 标记为selected

4. **AGLoc (RAL 2023)** - `xie2023agloc`
   - ✅ BibTeX条目
   - ✅ 预览图片：`agloc-teaser.png`
   - ✅ DOI和完整引用信息

### 4. 研究项目 (Projects)

所有项目已从`_portfolio`迁移至`_projects`：

1. **AGLoc++** - `1_agloc_project.md`

   - ✅ 项目描述和进度
   - ✅ 系统架构图
   - ✅ 技术栈说明
   - ✅ 相关图片迁移

2. **Campus Autonomy** - `2_campus_autonomy.md`

   - ✅ 自主导航系统描述
   - ✅ 硬件平台信息
   - ✅ 相关图片迁移

3. **SLAM Project** - `3_slam_project.md`

   - ✅ 垂直平面分割SLAM
   - ✅ 算法流程图
   - ✅ 实验结果图

4. **Deep Learning Navigation** - `4_deeplearning_project.md`

   - ✅ 强化学习导航
   - ✅ 奖励塑形方法
   - ✅ PPO框架图

5. **Industrial Perception** - `5_industrial_perception.md`
   - ✅ 工业感知系统
   - ✅ 点云处理流程
   - ✅ 实验结果

### 5. 新闻动态 (News/Announcements)

已创建5条新闻条目：

1. **announcement_1.md** - IROS 2025论文接收 (2025-01-15)
2. **announcement_2.md** - Neural Surfel论文发表 (2024-10-28)
3. **announcement_3.md** - LLM导航arXiv发布 (2024-09-13)
4. **announcement_4.md** - CAD2OSM arXiv发布 (2025-07-01)
5. **announcement_5.md** - 担任MoMa课程助教 (2024-09-01)

### 6. 图片资源迁移

已迁移的图片文件夹：

- ✅ `publication_preview/` - 论文预览图（4张）
- ✅ `AGLoc/` - AGLoc项目图片
- ✅ `Cad2Osm/` - CAD2OSM项目图片
- ✅ `campus-autonomy-robot/` - 校园自主机器人图片
- ✅ `deeplearning-project/` - 深度学习项目图片
- ✅ `slam-project/` - SLAM项目图片
- ✅ `industrial-perception/` - 工业感知图片
- ✅ `prof_pic.jpg` - 个人头像

### 7. CV数据 (\_data/cv.yml)

- ✅ 基本信息
- ✅ 教育背景
- ✅ 研究经验
- ✅ 技术技能
- ✅ 发表论文列表
- ✅ 学术链接

### 8. 社交媒体配置 (\_data/socials.yml)

- ✅ Email
- ✅ GitHub: jiajiezhang7
- ✅ Google Scholar ID
- ✅ ORCID ID
- ✅ ResearchGate
- ✅ Semantic Scholar ID

### 9. 合作者信息 (\_data/coauthors.yml)

已添加所有合作者：

- ✅ Sören Schwertfeger (导师)
- ✅ Fujing Xie
- ✅ Siyu Wu
- ✅ Xiaoyu Ma
- ✅ Jinyu Cui
- ✅ Laurent Kneip

### 10. GitHub仓库配置 (\_data/repositories.yml)

- ✅ GitHub用户：jiajiezhang7
- ✅ 仓库列表：agloc_plus_plus, campus_autonomy, lifelong_slam

---

## 📝 注意事项

### 已完成的PDF迁移：

- ✅ `assets/pdf/cv.pdf` - 个人简历
- ✅ `assets/pdf/agloc_ral_paper.pdf` - AGLoc论文
- ✅ `assets/pdf/cad2osm_paper.pdf` - CAD2OSM论文

### 需要手动添加的内容：

1. **其他PDF文件** - 如需要其他论文PDF：

   - `assets/pdf/llm_copilot_paper.pdf` - 需从出版商获取
   - `assets/pdf/neural_surfel_paper.pdf` - 需从出版商获取

2. **视频文件** - 旧仓库有5个视频文件（总计~176MB）：

   - `AGLoc-posetracking-cutted.mp4` (50MB)
   - `MoMa_Project_Demo.mp4` (33MB)
   - `RAL2025_Multimedia_Materials.mp4` (47MB)
   - `campusautonomy.mp4` (19MB)
   - `slam_projects.mp4` (24MB)

   **建议**：由于文件较大，建议上传到YouTube或Bilibili，然后在网页中嵌入链接

3. **GitHub Actions** - 配置自动部署到GitHub Pages

4. **域名设置** - 如果需要自定义域名，在仓库设置中配置

---

## 🔧 下一步建议

1. **测试网站**

   ```bash
   bundle install
   bundle exec jekyll serve
   ```

   访问 `http://localhost:4000` 验证所有页面正常显示

2. **检查所有链接** - 确保内部链接和外部链接都有效

3. **优化图片** - 可以考虑压缩大图片以提高加载速度

4. **添加Google Analytics** - 如需追踪网站访问数据

5. **SEO优化** - 检查meta标签和sitemap

6. **备份旧仓库** - 确保旧仓库数据安全

---

## 📊 迁移统计

- **配置文件**: 1个主配置文件已更新
- **页面文件**: 1个About页面已更新
- **论文条目**: 4篇论文（BibTeX格式）
- **项目文件**: 5个研究项目
- **新闻条目**: 5条动态
- **图片文件**: 30+张图片
- **数据文件**: 4个YAML配置文件

---

## ✨ 迁移完成

所有核心内容已成功从旧模板迁移到al-folio新模板。新网站具有更现代的设计、更好的响应式布局和更丰富的学术功能。

**迁移完成时间**: 2025-09-30 23:03
