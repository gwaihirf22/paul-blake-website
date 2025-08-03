# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Local Development
- `npm install` - Install dependencies
- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Docker Development
- `docker build -t paul-blake-website .` - Build Docker image
- `docker run -p 3010:3010 paul-blake-website` - Run container
- `docker compose up` - Run with Docker Compose

## Architecture Overview

This is a Next.js 14 personal website using the Pages Router with MDX blog functionality. The site features a main blog and a dedicated theology section.

### Key Architecture Patterns

**Content Management:**
- Blog posts are MDX files in `content/blog/` (regular posts) and `content/blog/theology/` (theology posts)
- Static generation at build time using `getStaticProps()` and `getStaticPaths()`
- MDX bundling with `mdx-bundler` for rich content with React components
- Gray-matter for frontmatter parsing

**Routing Structure:**
- `/` - Homepage with profile, skills, and project showcase
- `/blog` - Main blog index listing regular posts
- `/blog/[slug]` - Individual blog post pages
- `/blog/theology` - Theology section index
- `/blog/theology/[slug]` - Individual theology posts
- `/projects` - Project showcase page
- `/about` - About page

**Component Architecture:**
- Global app wrapper in `_app.js` with fixed navbar and scrollbar visibility
- Reusable components in `components/`: Navbar, Logo, ReadingProgress, Comments, etc.
- Styled-jsx for component-scoped CSS
- CSS custom properties for theming in `globals.css`

**Comment System:**
- Giscus integration with GitHub Discussions backend
- Comments component automatically loaded on all blog post pages
- Repository: `gwaihirf22/paul-blake-website` with "General" category
- Theme follows system preference (dark/light mode)

**Blog Post Processing:**
- Automatic reading time calculation (200 words/minute)
- Reading progress bar for posts >2 minutes
- Syntax highlighting with `rehype-prism-plus`
- Date formatting and sorting by publication date

**Deployment:**
- Docker multi-stage builds with standalone output
- GitHub Actions CI/CD to Docker Hub
- Production deployment to Unraid server
- Sitemap generation with `next-sitemap`

### Content Structure

Blog posts require frontmatter:
```yaml
---
title: "Post Title"
date: "2025-01-27"
author: "Paul Blake"
---
```

### Docker Configuration

The app runs on port 3010 in production. The Dockerfile uses Next.js standalone output for optimized builds and includes proper static asset handling.

## Comment System Configuration

**Giscus Setup:**
- Repository: `gwaihirf22/paul-blake-website`
- Repository ID: `R_kgDOO36vbA`
- Category: "General" 
- Category ID: `DIC_kwDOO36vbM4CtvQt`
- Mapping: `pathname` (each blog post gets its own discussion)
- Theme: `preferred_color_scheme` (adapts to user's system)

**Dependencies:**
- `@giscus/react` - React component for Giscus integration

**Component Location:**
- `components/Comments.jsx` - Main comment component
- Imported in both `pages/blog/[slug].js` and `pages/blog/theology/[slug].js`

**Reconfiguration:** 
If you need to change categories or repository settings, update the configuration values in `components/Comments.jsx` and ensure GitHub Discussions is enabled with the giscus app installed.

### Key Files to Understand

- `pages/_app.js` - Global app wrapper and layout
- `pages/blog/[slug].js` - Dynamic blog post rendering with MDX and comments
- `pages/blog/theology/[slug].js` - Theology post rendering (mirrors main blog) with comments
- `components/Comments.jsx` - Giscus comment system integration
- `next.config.js` - Next.js configuration with standalone output
- `docker-compose.yml` - Production deployment configuration