# Paul Blake's Personal Website

A modern Next.js website featuring a blog, project showcase, and personal information. Built with MDX for rich content creation and deployed with Docker and CI/CD automation.

<!-- Trigger deployment to fix profile image display - 2025-06-10 -->

This is a personal website and blog built with [Next.js](https://nextjs.org) using the Pages Router. The site features a main blog and a dedicated theology section for Christian faith, theological discussions, and philosophy.

## Features

- **Personal Blog**: Thoughts on development, technology, and general interests
- **Theology Section**: Dedicated area for Christian faith, theology, philosophy, and science discussions
- **Interactive Games**: Browser-based games built with HTML5 Canvas and React
- **Email Subscriptions**: MailerLite-powered subscription system with category-specific notifications
- **Comment System**: GitHub Discussions integration with reactions and email notifications
- **MDX Support**: Write blog posts in Markdown with React component support
- **Responsive Design**: Clean, modern UI that works on all devices
- **Static Site Generation**: Optimized performance with Next.js SSG
- **Docker Support**: Containerized for easy deployment

## Project Structure

```
├── content/
│   └── blog/
│       ├── technology/          # Technology & Development posts
│       │   ├── ai-app-integration-one-shot-fallacy.mdx
│       │   └── ...              # more technology posts
│       └── theology/            # Theology & Faith posts
│           ├── joy-as-defiance-the-christian-rebellion.mdx
│           └── ...              # more theology posts
├── pages/
│   ├── blog/
│   │   ├── technology/          # Technology section pages
│   │   │   ├── index.js         # Technology blog index
│   │   │   └── [slug].js        # Individual technology posts
│   │   ├── theology/            # Theology section pages
│   │   │   ├── index.js         # Theology blog index
│   │   │   └── [slug].js        # Individual theology posts
│   │   └── index.js             # Blog landing page (all categories)
│   ├── projects/
│   │   ├── games/               # Interactive games section
│   │   │   ├── index.js         # Games showcase page
│   │   │   └── helicopter.js    # Helicopter Game page
│   │   └── index.js             # Main projects page
├── components/
│   ├── games/                   # Game-specific components
│   │   └── HelicopterGame.jsx   # Helicopter game engine and UI
│   ├── Navbar.js                # Main navigation with games dropdown
│   └── ...                      # other reusable components
├── styles/
│   └── globals.css
├── .github/workflows/           # CI/CD and security automation
├── SECURITY_ROADMAP.md          # Security improvements and monitoring
├── UPGRADE_ROADMAP.md           # Technical upgrades and migrations
├── PERFORMANCE_OPTIMIZATION.md  # Performance improvement plan
├── PROJECT_MANAGEMENT.md        # Unified project management overview
└── CHANGELOG.md                 # Version history and changes
```

## Getting Started

### Development

First, install dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Quality Assurance

Run performance and accessibility audits:

```bash
# Run Lighthouse CI locally (requires app to be built first)
npm run lighthouse:local

# Run security audit
npm audit

# Run linting
npm run lint
```

### Docker Development

You can also run the project using Docker:

```bash
# Build the image
docker build -t paul-blake-website .

# Run the container
docker run -p 3010:3010 paul-blake-website
```

Or use Docker Compose:
 
```bash
docker compose up
```

## Blog Content

### Writing Blog Posts

- **Regular Posts**: Add `.mdx` files to `content/blog/`
- **Theology Posts**: Add `.mdx` files to `content/blog/theology/`

Each post requires frontmatter:

```yaml
---
title: "Your Post Title"
date: "2025-01-27"
author: "Paul Blake"
---
```

### Theology Section

The theology section (`/blog/theology`) is dedicated to:
- Christian faith and doctrine

## Project Documentation

### Security & Compliance
- **[Security Roadmap](SECURITY_ROADMAP.md)** - Comprehensive security improvements, vulnerability tracking, and monitoring
- **[Changelog](CHANGELOG.md)** - Version history, security fixes, and feature updates

### Technical Planning
- **[Upgrade Roadmap](UPGRADE_ROADMAP.md)** - Next.js 15, React 19, and other major version migrations
- **[Performance Optimization](PERFORMANCE_OPTIMIZATION.md)** - Content optimization, build improvements, and performance strategies

### Project Management
- **[Project Management Overview](PROJECT_MANAGEMENT.md)** - Unified view of all roadmaps, timelines, and success metrics
- **[Bug Tracker](BUG_TRACKER.md)** - Known issues, fixes, and development notes

### Development Workflows
- **Automated Security Scanning** - Weekly vulnerability scans via GitHub Actions
- **Lighthouse CI** - Automated performance and accessibility audits on every push
- **Performance Monitoring** - Automated performance testing and optimization  
- **Deployment Pipeline** - Automated Docker builds and deployments
- Theological discussions and apologetics
- Philosophy and worldview topics
- Science and faith intersection

## Comment System

The website features an integrated comment system powered by [Giscus](https://giscus.app) and GitHub Discussions.

### Features
- **GitHub Integration**: Comments are stored as GitHub Discussions in this repository
- **No Separate Registration**: Users comment with their existing GitHub accounts
- **Reactions**: Like/dislike and emoji reactions on posts and comments
- **Email Notifications**: Automatic notifications when someone replies to your comment
- **Moderation**: Full moderation capabilities through GitHub's interface
- **Privacy Focused**: No tracking, no ads, open source

### How It Works
- Comments appear at the bottom of each blog post (both regular and theology posts)
- Users click "Sign in with GitHub" to leave comments
- Each blog post creates a separate GitHub Discussion automatically
- Users receive email notifications for replies based on their GitHub notification settings
- Repository maintainers can moderate comments directly on GitHub

### For Users
- Visit any blog post and scroll to the bottom to see the comment section
- Sign in with GitHub to participate in discussions
- Customize your GitHub notification preferences to control email alerts
- Use reactions (👍👎❤️😄🎉😕🚀👀) to engage with posts and comments

## Deployment

### Automated Deployment to Unraid

This project includes a GitHub Actions workflow that automatically deploys to an Unraid server on every push to the `main` branch.

#### Workflow Features:
- **Docker Build**: Creates optimized Docker image for `linux/amd64`
- **Docker Hub Push**: Pushes image to Docker Hub registry
- **SSH Deployment**: Pulls latest image and restarts on Unraid server
- **Auto Cleanup**: Removes old Docker images to save space

#### Required GitHub Secrets:

Set these in your repository settings under **Settings** → **Secrets and variables** → **Actions**:

| Secret | Description | Example |
|--------|-------------|---------|
| `DOCKER_USERNAME` | Docker Hub username | `your-username` |
| `DOCKER_TOKEN` | Docker Hub access token | `dckr_pat_...` |
| `UNRAID_HOST` | Unraid server IP address | `192.168.1.100` |
| `UNRAID_USERNAME` | Unraid username | `root` |
| `SSH_PRIVATE_KEY` | SSH private key for Unraid access | `-----BEGIN OPENSSH PRIVATE KEY-----...` |

#### Deployment Process:
1. Code is pushed to `main` branch
2. GitHub Actions builds Docker image
3. Image is pushed to Docker Hub registry
4. SSH into Unraid server and pull latest image from Docker Hub
5. Docker Compose restarts container with new image
6. Old images are cleaned up automatically

#### Docker Compose Configuration:

Your `docker-compose.yml` on the Unraid server should reference your Docker Hub image:

```yaml
services:
  paul-blake-site:
    image: your-username/paul-blake-site:latest
    ports:
      - "3000:3000"
    # ... other configuration
```

### Manual Deployment

You can also deploy manually:

```bash
# Build for production
npm run build

# Or using Docker
docker build -t paul-blake-site:latest .
```

## Tech Stack

- **Framework**: Next.js 14 (Pages Router)
- **Content**: MDX with gray-matter
- **Styling**: Plain CSS
- **Deployment**: Docker + GitHub Actions
- **Server**: Unraid with Docker Compose

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [MDX Documentation](https://mdxjs.com/) - Writing content with MDX
- [Docker Documentation](https://docs.docker.com/) - Containerization
- [GitHub Actions](https://docs.github.com/en/actions) - CI/CD workflows

## License

This project is personal/educational use. Content and code are © Paul Blake.

## Notes & Troubleshooting

### Navbar dropdown (desktop/mobile)
- If desktop dropdown spacing/rounding appears incorrect, ensure `styles/globals.css` desktop overrides are loaded; they intentionally resolve styled‑jsx precedence.
- Mobile submenu uses container-level toggling (display/height/visibility/overflow) and disables hover-open under the mobile media query. If submenu appears but does not occupy space, verify that the container is toggling `display:block` and `height:auto` on open.

### Dropdown Navigation Cutoff Issues (FIXED 2025-09-02)
- **Issue**: Dropdowns extended beyond viewport boundaries on medium-sized screens (769px-1200px)
- **Root cause**: CSS specificity conflicts prevented positioning rules from applying
- **Solution**: Nuclear CSS approach with `!important` declarations
- **Implementation**: 
  ```css
  .nav-dropdown:last-of-type .dropdown-menu {
    left: auto !important;
    right: 0 !important;
  }
  @media (max-width: 1200px) and (min-width: 769px) {
    .nav-dropdown .dropdown-menu {
      left: auto !important;
      right: 0 !important;
    }
  }
  ```
- **Debug tip**: Add colored borders to dropdowns to visualize CSS rule application

### Viewport Meta Tag Warning (FIXED 2025-09-02)
- **Issue**: Next.js warning "viewport meta tags should not be used in _document.js's <Head>"
- **Solution**: Move viewport meta tag from `pages/_document.js` to `pages/_app.js`
- **Implementation**: Use Next.js `Head` component in `_app.js` for viewport configuration
- **Mobile Gaming**: Essential for proper fullscreen API and touch event handling

### Color Scheme
The site uses a standardized dark theme with CSS variables:

```css
:root {
  --color-background: #0f172a;      /* Dark blue-gray background */
  --color-text-primary: #e2e8f0;    /* White text */
  --color-text-secondary: #a0aec0;  /* Gray secondary text */
  --color-accent: #00bcd4;          /* Light blue accent */
  --color-hover: #0891b2;           /* Darker blue for hover */
  --color-border: #334155;          /* Border color */
  --color-card-background: #1e293b; /* Card backgrounds */
}
```

**Navigation Colors:**
- Top-level links (Home, Blog, Projects, About): Light blue (`var(--color-accent)`)
- Dropdown items (Blog submenu): White (`var(--color-text-primary)`)
- Hover/active states: Subtle blue backgrounds with opacity

See `CLAUDE.md` for complete development guidelines and color usage standards.
