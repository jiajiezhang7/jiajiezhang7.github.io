# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

- No existing WARP.md was found; this is the initial version.

## Common commands

- Local dev (Docker, recommended)
  - docker compose pull
  - docker compose up
  - Open http://localhost:8080 (livereload on 35729)
- Local dev (Ruby/manual)
  - bundle install
  - pip3 install --upgrade nbconvert
  - bundle exec jekyll serve
- Production build
  - JEKYLL_ENV=production bundle exec jekyll build
  - npm install && npm run purge:css
- Manual deploy script (interactive; force-pushes gh-pages)
  - bin/deploy [-s SRC_BRANCH] [-d DEPLOY_BRANCH] [--no-push]
- Formatting
  - npx prettier . --check
  - npx prettier . --write

## High-level architecture

- Static site built with Jekyll (al-folio theme)
  - Content: _pages, _posts, _projects, _news; data in _data/; bibliography in _bibliography/
  - Presentation: _layouts/ (templates), _includes/ (partials), _sass/ + assets/ (styles, js, images)
  - Configuration: _config.yml drives collections, plugins, third-party libs, comments, image processing, excludes
- Notable build-time behaviors
  - PurgeCSS trims unused CSS after build (outputs to _site/assets/css)
  - Image processing via ImageMagick; responsive WebP generation if enabled
  - Minification via jekyll-minifier (HTML/CSS) and jekyll-terser (JS)
  - Third-party libraries pipeline (_plugins/download-3rd-party.rb) can download CDN assets into assets/libs and rewrite URLs based on baseurl
  - Cache-busting filter (_plugins/cache-bust.rb) appends MD5 digests to asset URLs
  - External content ingestion (_plugins/external-posts.rb) from RSS/URLs if configured in external_sources
  - Google Scholar citations Liquid tag (_plugins/google-scholar-citations.rb) fetches citation counts at build
- Comments
  - Giscus configured in _config.yml (CI updates giscus.repo before build)

## CI and deployment

- GitHub Pages deployment (on push to main)
  - Builds with Ruby 3.3.5; installs nbconvert; JEKYLL_ENV=production; runs npm run purge:css; uploads _site; deploys via actions/deploy-pages
- Quality checks
  - Prettier (Liquid support) on PRs and pushes; failing runs attach an HTML diff artifact
  - Link checking: lychee on source and (post-deploy) on built site
  - Accessibility: axe-core workflow (manual trigger via workflow_dispatch)
  - Security scanning: CodeQL for JavaScript/TypeScript and Ruby

## Notes for working effectively

- baseurl and url in _config.yml affect asset/link rewriting and third-party library paths
- Docker dev exposes 8080 (site) and 35729 (livereload); volume mounts current tree into container
- Jupyter/Notebook content requires nbconvert (Python) when building with CI or locally without Docker
- Normal flow: rely on CI to publish Pages; avoid bin/deploy unless you intend to replace the working tree with built artifacts

## Sources (authoritative in this repo)

- README.md (project overview, features, code quality checks)
- INSTALL.md (Docker/Ruby setup, build, deploy, Netlify instructions)
- package.json (purge:css script; Prettier plugin)
- docker-compose.yml, docker-compose-slim.yml (dev ports, volumes, image tag)
- Dockerfile (system deps incl. ImageMagick, inotify-tools; entrypoint)
- .github/workflows/deploy.yml, prettier*.yml, broken-links*.yml, axe.yml, codeql.yml
- _config.yml (collections, plugins, third_party_libraries, images, comments)
- _plugins/*.rb (download-3rd-party.rb, cache-bust.rb, external-posts.rb, google-scholar-citations.rb)
