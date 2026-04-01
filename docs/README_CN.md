# Jiajie Zhang 的个人学术主页

基于 [al-folio](https://github.com/alshedivat/al-folio) 主题构建的个人学术网站。

## 🌟 特性

- 📚 自动化的论文管理（使用Jekyll Scholar）
- 🎨 现代化的响应式设计
- 🌓 深色/浅色模式切换
- 📱 移动端友好
- 🔍 论文搜索功能
- 📊 项目展示
- 📝 博客功能
- 👥 合作者管理

## 🚀 本地运行

> 重要：这个站点的本地预览依赖 **Ruby + Jekyll**，不是 Node 开发服务器，也不是 Python `venv`。
> 但这个仓库现在提供了一个 `npm run serve` 包装命令，内部会自动调用正确的 Ruby/Jekyll 启动流程。

### 环境要求

- Ruby 3.0+
- Jekyll 4.3+
- Bundler

### 已验证的本地环境（macOS）

- Ruby 3.4.4
- Bundler 2.6.9
- Jekyll 4.4.1
- 建议使用 Homebrew Ruby：`/opt/homebrew/opt/ruby/bin/ruby`

如果你的终端默认走到了系统 Ruby（例如 `/usr/bin/ruby` 或 `/usr/bin/bundle`），即使机器里已经装了正确依赖，也可能出现 `Could not find 'bundler' (2.6.9)` 这类错误。

### 安装步骤

1. 克隆仓库

```bash
git clone https://github.com/jiajiezhang7/jiajiezhang7-new.github.io.git
cd jiajiezhang7-new.github.io
```

2. 安装依赖

```bash
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
ruby -v
bundle -v
bundle install
```

3. 运行本地服务器

```bash
npm run serve
```

4. 访问网站
   打开浏览器访问 `http://localhost:4000`

### 推荐启动方式

以后优先使用：

```bash
npm run serve
```

这个命令会调用仓库里的 `bin/serve-local`，自动优先选择 Homebrew Ruby，避免误用系统 `/usr/bin/bundle`。

如果你需要传递额外参数给 Jekyll，可以这样写：

```bash
npm run serve -- --host 127.0.0.1 --port 4001
```

### 故障排查

如果本地启动失败，先确认当前终端是否使用了正确的 Ruby / Bundler：

```bash
which ruby
which bundle
ruby -v
bundle -v
bundle exec jekyll --version
```

期望看到的 `ruby` / `bundle` 路径应优先落在 `/opt/homebrew/opt/ruby/bin/` 下，而不是 `/usr/bin/`。

如果看到 `/usr/bin/bundle`，请先切换 PATH 再启动：

```bash
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
hash -r
bundle check || bundle install
npm run serve
```

### Python / venv 的作用

- 主页本地预览 **不需要** Python `venv`
- `requirements.txt` 当前只包含 `nbconvert`
- 只有在你需要处理 Jupyter Notebook 相关文章或相关辅助工具时，Python 依赖才是可选需要

## 📁 项目结构

```
.
├── _bibliography/          # BibTeX论文条目
│   └── papers.bib
├── _data/                  # 结构化数据
│   ├── cv.yml             # CV数据
│   ├── socials.yml        # 社交媒体链接
│   ├── coauthors.yml      # 合作者信息
│   └── repositories.yml   # GitHub仓库
├── _news/                  # 新闻动态
├── _pages/                 # 主要页面
│   ├── about.md           # 首页/关于我
│   ├── publications.md    # 论文列表
│   ├── projects.md        # 项目展示
│   ├── cv.md              # 简历
│   └── teaching.md        # 教学经历
├── _projects/              # 项目详情
├── assets/
│   ├── img/               # 图片资源
│   │   ├── publication_preview/  # 论文预览图
│   │   ├── prof_pic.jpg         # 个人头像
│   │   └── ...                   # 项目图片
│   └── pdf/               # PDF文件
│       ├── cv.pdf         # 个人简历
│       └── ...            # 论文PDF
└── _config.yml            # 网站配置
```

## 🛠️ 自定义配置

### 修改个人信息

编辑 `_config.yml`:

```yaml
title: Your Name
first_name: Your
last_name: Name
email: your.email@example.com
```

### 添加新论文

在 `_bibliography/papers.bib` 中添加BibTeX条目：

```bibtex
@article{yourname2024paper,
  title={Your Paper Title},
  author={Your Name and Others},
  journal={Conference/Journal Name},
  year={2024},
  ...
}
```

### 添加新项目

在 `_projects/` 目录下创建新的Markdown文件。

### 更新新闻

在 `_news/` 目录下创建新的Markdown文件。

## 📝 重要文件说明

### 论文管理 (`_bibliography/papers.bib`)

- 使用BibTeX格式管理所有论文
- 支持的字段：
  - `abbr`: 会议/期刊缩写
  - `preview`: 预览图片
  - `pdf`: PDF文件路径
  - `html`: 在线链接
  - `selected`: 是否在首页显示

### 社交媒体 (`_data/socials.yml`)

配置所有社交媒体和学术平台链接：

- Email
- GitHub
- Google Scholar
- ORCID
- ResearchGate
- Semantic Scholar

### CV数据 (`_data/cv.yml`)

结构化的简历数据，自动渲染到CV页面。

## 🎨 主题定制

### 颜色主题

编辑 `_sass/_variables.scss` 修改颜色方案。

### 字体

在 `_config.yml` 中配置Google Fonts。

### 布局

修改 `_layouts/` 目录下的模板文件。

## 📦 部署

### GitHub Pages（推荐）

1. 推送代码到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择部署分支（通常是`main`或`gh-pages`）

### 自定义域名

1. 在仓库根目录创建 `CNAME` 文件
2. 添加你的域名，如：`www.yourname.com`
3. 在域名提供商配置DNS记录

## 🔧 常见问题

### Q: 图片不显示？

A: 检查图片路径是否正确，确保图片在 `assets/img/` 目录下。

### Q: 论文不显示？

A: 确保BibTeX格式正确，检查 `_bibliography/papers.bib` 文件。

### Q: 本地运行报错？

A: 尝试：

```bash
bundle update
bundle exec jekyll serve --trace
```

## 📚 更多资源

- [al-folio 文档](https://github.com/alshedivat/al-folio)
- [Jekyll 文档](https://jekyllrb.com/docs/)
- [Jekyll Scholar](https://github.com/inukshuk/jekyll-scholar)

## 📧 联系方式

如有问题，请联系：

- Email: zhangjj2023@shanghaitech.edu.cn
- GitHub: [@jiajiezhang7](https://github.com/jiajiezhang7)

## 📄 许可证

本项目基于 MIT 许可证，详见 [LICENSE](LICENSE) 文件。

---

**最后更新**: 2025-09-30
