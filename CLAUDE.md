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
- `/projects/games` - Games showcase page
- `/projects/games/helicopter` - Helicopter Game page
- `/about` - About page

**Component Architecture:**
- Global app wrapper in `_app.js` with fixed navbar, scrollbar visibility, and scroll restoration control
- Reusable components in `components/`: Navbar, Logo, ReadingProgress, Comments, YouTube, etc.
- Styled-jsx for component-scoped CSS
- CSS custom properties for theming in `globals.css`

**Scroll Behavior:**
- Custom scroll restoration implemented in `_app.js` to fix percentage-based scroll persistence bug
- Manual scroll control using `window.history.scrollRestoration = "manual"`
- Multi-stage scroll-to-top on navigation to override Next.js's internal scroll restoration
- Smooth scrolling (`scroll-behavior: smooth`) temporarily disabled during navigation to prevent animation conflicts
- All new pages load at scroll position 0 (top of page)
- See Bug #005 in BUG_TRACKER.md for detailed implementation notes

**Navigation System:**
- Responsive dropdown navigation with viewport-aware positioning
- CSS-only solution using `!important` overrides for reliable dropdown positioning
- Mobile-optimized viewport configuration for gaming and touch interactions
- Dropdown overflow prevention: right-alignment on medium screens (769px-1200px)
- Fixed dropdown width (280px) with viewport-based max-width constraints

**Mobile & Gaming Enhancements:**
- Progressive Web App (PWA) capable viewport configuration
- Fullscreen API integration for immersive mobile gaming
- Touch event optimization with page scroll prevention during gameplay
- Mobile-first responsive design for HTML5 Canvas games
- Enhanced touch targets (48px minimum) for better mobile accessibility

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
- Pinned "Welcome" post at top of blog index (`/blog`) with distinctive styling
  - Always visible regardless of post dates
  - Gradient background with accent color border
  - "📌 Pinned" badge for clear identification
  - Introduces visitors to blog content and categories

**Games System:**
- Interactive browser games built with HTML5 Canvas and React
- Games located in `pages/projects/games/` directory structure
- Game components in `components/games/` for reusable game logic
- Helicopter Game: Physics-based arcade game with canvas rendering, collision detection, and localStorage high scores
- Navigation integration: Games dropdown in Projects navbar section
- Featured game integration on homepage with direct play link

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

### CSS Styling Patterns & Important Notes

**Button Styling Conflicts:**
- `.dark-card a` styles override `.btn` styles for buttons inside dark card containers
- Solution: Use `.dark-card .btn` selector with higher specificity to restore button appearance
- Always check CSS hierarchy when buttons don't match expected styling

**Dark Card Component Rules:**
- `.dark-card a` applies to ALL anchor tags inside dark cards (including Next.js Link components)
- This includes custom colors, borders, and hover effects that override button styles
- When adding buttons inside `.dark-card`, ensure `.dark-card .btn` styles are defined

**Dropdown Navigation Issues:**
- CSS specificity conflicts can prevent dropdown positioning rules from applying
- **Solution**: Use `!important` declarations for critical positioning rules
- Medium-screen viewport cutoffs require explicit right-alignment CSS
- Debug approach: Add colored borders to visualize which CSS rules are active
- **Key Fix**: `left: auto !important; right: 0 !important;` for reliable positioning

**Mobile Dropdown Centering Issues:**
- Parent container `width: 100%` constraints prevent natural centering behavior
- **Problem**: Containers stretch edge-to-edge, leaving no room for centering
- **Solution**: Remove `width: 100%`, use `width: auto` with `margin: 0 auto`
- **Key Lesson**: When centering fails, check parent width constraints before adding centering properties
- **Debugging approach**: Compare working elements (top-level nav) with non-working elements (dropdowns) at container level
- **Red herring**: `text-align: center` only centers content *inside* containers, not the containers themselves

**Viewport Meta Tag Placement:**
- ⚠️ **IMPORTANT**: Viewport meta tags must be in `_app.js`, NOT `_document.js`
- Next.js 13+ throws warnings for viewport meta tags in `_document.js`
- Mobile gaming requires specific viewport configuration for optimal touch handling

**Specificity Hierarchy:**
1. Global `.btn` styles in `globals.css`
2. Container-specific `.dark-card a` overrides
3. Combined `.dark-card .btn` restores button styling
4. Page-specific styles (styled-jsx) can override global styles
5. **Nuclear option**: `!important` declarations override all conflicting CSS

## Recent Updates

### Mobile Navigation (2025-01-29)
- Improved touch targets to 44px+ minimum
- Added visual feedback for touch interactions
- Standardized color scheme across navigation elements
- Enhanced spacing and typography for mobile usability

### Games System Implementation (2025-08-29)
- Added interactive games section to website architecture
- Implemented Helicopter Game with HTML5 Canvas and React Hooks
- Created scalable games directory structure: `/projects/games/`
- Added Games dropdown to Projects navigation with mobile responsiveness
- Fixed CSS styling conflicts between `.dark-card a` and `.btn` selectors
- Integrated featured game showcase on homepage with direct play link
- Implemented physics-based game engine with collision detection and particle effects
- Added localStorage integration for persistent high score tracking

### Mobile Gaming Enhancements (2025-09-02)
- Enhanced mobile viewport configuration for immersive gaming
- Implemented Fullscreen API for native app-like mobile experience
- Added touch event optimization with page scroll prevention
- Created progressive difficulty system with website-themed rewards
- Improved helicopter graphics with realistic rotating rotors
- Fixed mobile UI layout issues with full-screen responsive design

### Navigation Dropdown Fixes (2025-09-02)
- **CRITICAL FIX**: Resolved dropdown cutoff issues on medium-sized screens
- Implemented nuclear CSS approach with `!important` overrides for reliable positioning
- Added right-alignment for Projects dropdown and medium-screen responsiveness
- Fixed viewport meta tag placement (moved from `_document.js` to `_app.js`)
- **Debugging approach**: Used colored borders to identify CSS specificity issues
- Solution: Aggressive CSS positioning that overrides all conflicting rules

### Mobile Navbar Dropdown Centering Fix (2025-10-09)
- **Fixed**: Mobile dropdown items now center correctly like top-level nav buttons
- **Root cause**: Parent containers had `width: 100%` constraints preventing natural centering
- **Solution**: Removed `width: 100%` from `.nav-dropdown`, changed `.dropdown-menu` to `width: auto` with `margin: 0 auto`
- **Key lesson**: Check parent container width constraints before adding centering properties
- **Files modified**: `components/Navbar.js` (lines 565, 579, 587)
- **Blog post**: Published comprehensive debugging guide at `/blog/technology/debugging-mobile-navbar-centering-bug`
- **Documentation**: Added to BUG_TRACKER.md as Bug #004 (resolved)

### Scroll Position Bug Fix (2025-12-13)
- **Fixed**: Pages now always load at scroll position 0 (top) instead of persisting scroll percentage from previous page
- **Root cause**: Next.js's internal scroll restoration fired after `routeChangeComplete` event, combined with `scroll-behavior: smooth` CSS causing percentage-based scroll calculations
- **Solution**: Implemented multi-stage scroll-to-top in `_app.js` using `requestAnimationFrame` and setTimeout to catch deferred scroll restoration
- **Key changes**:
  - Set `window.history.scrollRestoration = "manual"` for manual control
  - Temporarily disable smooth scrolling during navigation
  - Three sequential scroll-to-top calls at strategic intervals
  - Re-enable smooth scrolling after navigation completes
- **Files modified**: `pages/_app.js` (added useEffect hook with router event handlers)
- **Documentation**: Added to BUG_TRACKER.md as Bug #005 (resolved)

### Blog Pinned Post Feature (2025-12-13)
- **Added**: Permanent "Welcome to My Blog" pinned post at top of `/blog` index
- **Design**: Elegant gradient background with cyan accent border, "📌 Pinned" badge, and distinctive styling
- **Purpose**: Provides immediate context to visitors about blog content and categories
- **Implementation**: Static content in `pages/blog/index.js` with custom CSS styling
- **Styling**: Uses existing color scheme variables for consistency
- **Files modified**: `pages/blog/index.js` (added pinned-post section and CSS)