# Changelog

All notable changes to the Paul Blake Website project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Atomic Momentum is a featured project: screenshot composite from the Flutter web build, Flutter and Dart chips, status badge "Pre-release". The homepage featured grid is two columns at desktop so four cards sit 2x2; `/projects` no longer lists a project with a screenshot under In Progress as well.
- Light mode with a Sun/Moon switch in the navbar. Follows the OS preference by default; the choice is remembered. Theme is applied before first paint, comments follow it, code blocks and the games stay dark.
- Theme tokens for both palettes in `styles/globals.css`; `--color-on-accent` for text on accent fills.

### Fixed
- `--card-bg`, `--card-border` and `--bg-color` were used but never defined, so the subscription form and blog index boxes had no background.
- White-on-blue subscribe buttons and the warning callout text now meet WCAG AA contrast.
- RSS: the technology feed (`/api/rss/blog.xml`) was empty and the combined feed only carried theology, because both read the top level of `content/blog` where no posts live. The three routes now share `lib/rss.js`, which reads `content/blog/<category>`. Item descriptions come from front matter (`description`/`excerpt`) or a plain-text excerpt instead of raw MDX, and the feed's author email and fallback URL are the site's real ones.
- Blog notifications for technology posts always failed with 404: the workflow classified `content/blog/technology/*.mdx` as category `blog` and the API then looked for the file at the top level of `content/blog`. The API now reads `content/blog/technology` for that category and links emails to `/blog/technology/<slug>`; the workflow matches the technology folder explicitly. (Last failure: the Lion Tails guide, 2026-09-11.)
- Permanent redirects from the four pre-2025-08-28 post URLs (`/blog/first-post` etc.) to their `/blog/technology/` homes.

### Removed
- `pages/blog/[slug].js`: a leftover from before posts moved into category folders. It read the empty top level of `content/blog`, generated zero pages, and every `/blog/<slug>` URL has returned 404 since the move.

### Changed
- Dependencies brought current on 2026-10-15 via Dependabot: 44 production minors, 80+ dev updates, `feed` 5 → 6.0.0, ESLint 9 → 10.9.1, plus ws, finalhandler, @babel/runtime and style-to-js patches. Next is 16.4.1, React 19.3.0.
- CI audit gate raised from `moderate` to `critical` in `deploy.yml` and `security-scan.yml`: `braces` (via `next-sitemap`) and `sprintf-js` (via `gray-matter`) have no non-breaking fix, so the moderate gate failed every commit. To be lowered again when upstream patches land.
- Docs: README, CLAUDE.md/AGENTS.md, BUG_TRACKER, SECURITY_ROADMAP and the planning documents updated to the current stack and to the changes above; AGENTS.md is now a verbatim copy of CLAUDE.md apart from its first three lines.

### Planned
- Content pagination for large blog posts
- CSP headers implementation
- Rate limiting for API routes
- TypeScript migration planning

## [0.1.2] - 2025-08-29

### Security 🔒
- **CRITICAL**: Fixed PrismJS DOM Clobbering vulnerability (GHSA-x7hr-w5r2-h6wg)
  - Used package overrides to force secure `prismjs ^1.30.0` across all dependencies
  - Fixed vulnerable nested dependencies in `react-syntax-highlighter` and `refractor`
  - Reduced security vulnerabilities from 3 moderate to 0 moderate
- **ENHANCEMENT**: All security audits now pass with zero vulnerabilities

### Performance & Quality 🚀
- **ADDED**: Lighthouse CI for automated performance and accessibility auditing
  - Automated audits run on every push to main branch
  - Performance, accessibility, best practices, and SEO monitoring
  - Results uploaded to temporary public storage for review
  - Local testing capability with `npm run lighthouse:local`
- **ADDED**: GitHub Actions workflow for Lighthouse CI (`lighthouse-ci.yml`)
- **ADDED**: Lighthouse CI configuration files (`lighthouserc.json`, `lighthouserc.ci.json`)

### Development 🛠️
- **ADDED**: New npm scripts for quality assurance
  - `npm run lighthouse:ci` - Run Lighthouse CI in CI environment
  - `npm run lighthouse:local` - Run Lighthouse CI locally on port 3002
- **ENHANCEMENT**: Updated development workflow documentation

### Dependencies 📦
- **ADDED**: `@lhci/cli` for Lighthouse CI functionality
- **OVERRIDE**: Forced `prismjs ^1.30.0` for all packages to ensure security

### Documentation 📚
- **UPDATED**: `README.md` - Added Lighthouse CI documentation and quality assurance section
- **UPDATED**: `PROJECT_MANAGEMENT.md` - Updated security status and added Lighthouse CI to tools
- **UPDATED**: Development workflow documentation to include performance auditing

## [0.1.1] - 2024-12-19

### Security 🔒
- **CRITICAL**: Fixed multiple Next.js security vulnerabilities by updating from 14.2.5 to 14.2.32
  - Cache poisoning vulnerability (GHSA-gp8f-8m3g-qvj9)
  - Authorization bypass vulnerability (GHSA-7gfc-8cq8-jh5f)
  - DoS with Server Actions (GHSA-7m27-7ghc-44w9)
  - Race condition to cache poisoning (GHSA-qpjv-v59x-3qc4)
  - Information exposure in dev server (GHSA-3h52-269p-cp9r)
  - Authorization bypass in middleware (GHSA-f82v-jwr5-mffw)
- **ENHANCEMENT**: Added comprehensive security headers to `next.config.js`
  - `X-Frame-Options: DENY` - Prevents clickjacking attacks
  - `X-Content-Type-Options: nosniff` - Prevents MIME type sniffing
  - `Referrer-Policy: origin-when-cross-origin` - Controls referrer information
  - `X-XSS-Protection: 1; mode=block` - XSS protection
  - `Permissions-Policy` - Restricts browser features (camera, microphone, geolocation)
- **ENHANCEMENT**: Implemented automated security scanning via GitHub Actions
  - Weekly security audits
  - Dependency vulnerability scanning
  - Container security scanning
  - CodeQL static analysis
  - Lighthouse security auditing

### Dependencies 📦
- **UPGRADE**: `esbuild` 0.25.5 → 0.25.9
- **UPGRADE**: `react-syntax-highlighter` 15.6.1 → 15.6.6
- **NOTE**: PrismJS vulnerability (GHSA-x7hr-w5r2-h6wg) remains under monitoring

### Documentation 📚
- **ADDED**: `SECURITY_ROADMAP.md` - Comprehensive security improvement plan
- **ADDED**: `UPGRADE_ROADMAP.md` - Technical upgrade and migration strategy
- **ADDED**: `PERFORMANCE_OPTIMIZATION.md` - Performance improvement plan
- **ADDED**: `PROJECT_MANAGEMENT.md` - Unified project management overview
- **ADDED**: `.github/workflows/security-scan.yml` - Automated security scanning workflow
- **ADDED**: `CHANGELOG.md` - This changelog file

### Infrastructure 🏗️
- **ENHANCEMENT**: Added comprehensive project management structure
- **ENHANCEMENT**: Established security monitoring and alerting framework
- **ENHANCEMENT**: Created performance optimization strategy
- **ENHANCEMENT**: Planned technical modernization roadmap

## [0.1.0] - 2024-12-18

### Initial Release 🎉
- **ADDED**: Next.js 14.2.5 application with React 18.3.1
- **ADDED**: Blog system with MDX support
- **ADDED**: Technology and theology blog categories
- **ADDED**: RSS feed generation
- **ADDED**: Email subscription system via MailerLite
- **ADDED**: Blog notification system
- **ADDED**: Syntax highlighting with react-syntax-highlighter
- **ADDED**: Docker containerization
- **ADDED**: GitHub Actions deployment pipeline
- **ADDED**: Basic security configuration
- **ADDED**: SEO optimization with sitemap generation

### Features ✨
- **BLOG**: Dynamic blog post rendering with MDX
- **CATEGORIES**: Technology and theology blog categories
- **RSS**: Automated RSS feed generation for all posts and categories
- **SUBSCRIPTION**: Email subscription management
- **NOTIFICATIONS**: Automated blog post notifications
- **SYNTAX HIGHLIGHTING**: Code block syntax highlighting
- **RESPONSIVE**: Mobile-responsive design
- **SEO**: Search engine optimization
- **DEPLOYMENT**: Automated Docker deployment

### Technical Stack 🛠️
- **Framework**: Next.js 14.2.5
- **UI Library**: React 18.3.1
- **Styling**: CSS with custom design system
- **Content**: MDX with gray-matter parsing
- **Syntax Highlighting**: react-syntax-highlighter with PrismJS
- **Email**: MailerLite integration
- **Deployment**: Docker with GitHub Actions
- **Hosting**: Self-hosted on Unraid server

---

## Security Policy

### Reporting Security Issues
If you discover a security vulnerability within this project, please send an email to the development team. All security vulnerabilities will be promptly addressed.

### Security Updates
- Security patches are released as soon as possible
- Critical vulnerabilities are addressed within 24 hours
- High severity vulnerabilities are addressed within 48 hours
- Medium and low severity vulnerabilities are addressed within 1 week

## Versioning

This project uses [Semantic Versioning](https://semver.org/):
- **MAJOR** version for incompatible API changes
- **MINOR** version for added functionality in a backwards compatible manner
- **PATCH** version for backwards compatible bug fixes

## Release Process

1. **Development**: Features and fixes developed in feature branches
2. **Testing**: Comprehensive testing including security and performance
3. **Review**: Code review and security audit
4. **Release**: Tagged release with changelog update
5. **Deployment**: Automated deployment via GitHub Actions
6. **Monitoring**: Post-deployment monitoring and validation

---

**Maintained By**: Development Team  
**Last Updated**: 2024-12-19  
**Next Review**: 2024-12-26
