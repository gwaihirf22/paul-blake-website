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
- Reusable components in `components/`: Navbar, Logo, ReadingProgress, Comments, YouTube, etc.
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

## Blog Subscription System

**RSS Feeds:**
- `/api/rss/blog.xml` - Main blog posts (excluding theology)
- `/api/rss/theology.xml` - Theology posts only
- `/api/rss/all.xml` - All posts combined

**MailerLite Integration:** ✅ **FULLY MIGRATED FROM MAILGUN**
- Repository: Uses `@mailerlite/mailerlite-nodejs` for email subscription management
- Groups: Supports category-specific subscriptions with configured Group IDs
  - Technology Posts: `161750636988204571`
  - Theology Posts: `161750656038733632`
  - All Blog Posts: `161750623746786929`
- Domain Verification: `paul-blake.com` verified and authenticated
- Sender Email: `email.blog@paul-blake.com` configured as default sender
- Double Opt-in: GDPR-compliant email confirmation process
- Automated Campaigns: GitHub Actions trigger emails for new posts

**Dependencies:**
- `feed` - RSS feed generation
- `@mailerlite/mailerlite-nodejs` - Email service integration

**Environment Variables Required:**
```env
NEXT_PUBLIC_SITE_URL=https://paul-blake.com
MAILERLITE_API_KEY=your_mailerlite_api_key
ADMIN_EMAIL=email.blog@paul-blake.com
NOTIFICATION_SECRET=ml_blog_notification_secret_2025_v1
```

**GitHub Actions Secrets Required:**
- `NOTIFICATION_SECRET` - Same as environment variable above
- `NEXT_PUBLIC_SITE_URL` - Your deployed site URL for the API call

**Subscription API Endpoints:**
- `POST /api/subscribe` - Handle new subscriptions ✅ **WORKING**
- `POST /api/unsubscribe` - Handle unsubscription requests ✅ **WORKING** 
- `POST /api/send-notification` - Create draft campaigns for new posts ✅ **WORKING**

**Migration Status:**
- ✅ Mailgun completely removed
- ✅ MailerLite package installed and configured
- ✅ All API endpoints converted
- ✅ Group IDs configured
- ✅ Domain verified (`paul-blake.com`)
- ✅ Subscription forms working on `/blog` and `/blog/theology`
- ✅ Draft campaign creation working (manual sending required)

**Notification Workflow:**
- GitHub Actions automatically creates draft campaigns in MailerLite when new blog posts are published
- Draft campaigns include subject line and target the correct subscriber groups
- Manual step required: Complete campaign content and send from MailerLite dashboard
- This approach works with MailerLite's free plan limitations

### Key Files to Understand

- `pages/_app.js` - Global app wrapper and layout
- `pages/blog/[slug].js` - Dynamic blog post rendering with MDX and comments
- `pages/blog/theology/[slug].js` - Theology post rendering (mirrors main blog) with comments
- `components/Comments.jsx` - Giscus comment system integration
- `components/YouTube.jsx` - YouTube video embedding component for MDX posts
- `next.config.js` - Next.js configuration with standalone output
- `docker-compose.yml` - Production deployment configuration

## MDX Components

The blog uses several custom MDX components for rich content:

**YouTube Component (`components/YouTube.jsx`)**
- Embeds YouTube videos with responsive 16:9 aspect ratio
- Usage: `<YouTube videoId="19RghmEGw8E" title="Video Title" />`
- Automatically handles responsive sizing and clean styling
- Minimal margins for optimal spacing in blog posts

**Other MDX Components:**
- `Callout.jsx` - Info and warning callout boxes
- `CodeBlock.jsx` - Enhanced code blocks with syntax highlighting
- `Image.jsx` - Responsive images with captions and styling

**Usage in Blog Posts:**
```jsx
// Import at top of .mdx file
import { YouTube } from '../../../components/YouTube.jsx';
import { Callout } from '../../../components/Callout.jsx';
import { Image } from '../../../components/Image.jsx';

// Use in content
<YouTube videoId="VIDEO_ID" title="Description" />
<Callout type="info">Important information</Callout>
<Image src="/image.jpg" alt="Description" caption="Optional caption" />
```

# Paul Blake Website - Development Guidelines

## Color Scheme

### Primary Colors
- **Background**: `#0f172a` (Dark blue-gray)
- **Text Primary**: `#e2e8f0` (Light gray/white)
- **Text Secondary**: `#a0aec0` (Medium gray)
- **Accent**: `#00bcd4` (Light blue/cyan)
- **Hover**: `#0891b2` (Darker blue)

### UI Elements
- **Border**: `#334155` (Medium gray)
- **Card Background**: `#1e293b` (Dark gray)
- **Code Background**: `#1e293b` (Dark gray)
- **Link**: `#00bcd4` (Same as accent)

### CSS Variables
```css
:root {
  --color-background: #0f172a;
  --color-text-primary: #e2e8f0;
  --color-text-secondary: #a0aec0;
  --color-accent: #00bcd4;
  --color-link: #00bcd4;
  --color-code-background: #1e293b;
  --color-border: #334155;
  --color-card-background: #1e293b;
  --color-hover: #0891b2;
}
```

### Usage Guidelines

#### Navigation
- **Top-level links** (Home, Blog, Projects, About): Use `var(--color-accent)` (light blue)
- **Dropdown items** (Blog submenu): Use `var(--color-text-primary)` (white)
- **Hover states**: Use `rgba(0, 188, 212, 0.05)` for subtle feedback
- **Active states**: Use `rgba(0, 188, 212, 0.1)` for touch feedback

#### Content
- **Headings**: Use `var(--color-text-primary)` (white)
- **Body text**: Use `var(--color-text-primary)` (white)
- **Secondary text**: Use `var(--color-text-secondary)` (gray)
- **Links**: Use `var(--color-accent)` (light blue)
- **Code blocks**: Use `var(--color-code-background)` background

#### Interactive Elements
- **Buttons**: Use `var(--color-accent)` background with `var(--color-background)` text
- **Hover effects**: Use `var(--color-hover)` for darker blue
- **Focus states**: Use `var(--color-accent)` outline

## Mobile Navigation Guidelines

### Touch Targets
- **Minimum size**: 44px (Apple/Google guidelines)
- **Padding**: `1rem 1.5rem` for adequate touch area
- **Spacing**: `0.25rem 0` between top-level items, `0.5rem 0` between dropdown items

### Visual Feedback
- **Border radius**: `8px` for modern touch feel
- **Transitions**: `all 0.2s ease` for smooth interactions
- **Hover**: Subtle background color change
- **Active**: Scale transform and darker background

### Typography
- **Top-level links**: `1.1rem` font size
- **Dropdown items**: `1rem` font size
- **Text alignment**: Centered for mobile layout

## Development Standards

### CSS Organization
1. **Global variables** in `styles/globals.css`
2. **Component-specific styles** in styled-jsx
3. **Mobile overrides** with `!important` for specificity
4. **Media queries** for responsive design

### File Structure
- **Components**: `/components/`
- **Pages**: `/pages/`
- **Styles**: `/styles/globals.css`
- **Content**: `/content/blog/`

### Best Practices
- Always use CSS variables for colors
- Test on mobile devices for touch interactions
- Maintain consistent spacing and typography
- Use semantic HTML with proper accessibility attributes
- Keep component styles scoped to avoid conflicts

## Recent Updates

### Mobile Navigation (2025-01-29)
- Improved touch targets to 44px+ minimum
- Added visual feedback for touch interactions
- Standardized color scheme across navigation elements
- Enhanced spacing and typography for mobile usability