# Changelog

All notable changes to the Paul Blake Website project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Content pagination for large blog posts
- CSP headers implementation
- Rate limiting for API routes
- Next.js 15 migration planning
- React 19 migration planning
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
