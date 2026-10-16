# Upgrade Roadmap

> **Status note (2026-10-16):** this document is a snapshot from its original date. Every migration it plans is done. The site now runs Next.js 16.4.1, React 19.3.0, Node 22 and ESLint 10.9.1; the Next 16 / React 19 migration landed on 2026-09-02 (commit 1ff15d1) and the 2026-10-15 Dependabot batch brought the rest current. For the live audit picture and the deploy gate see `SECURITY_ROADMAP.md`, "Known advisories without a fix". Treat the task lists below as history, not a backlog.

## Overview
This document outlines the planned upgrades, migrations, and technical improvements for the Paul Blake Website project.

## Current Technology Stack
- **Next.js**: 16.4.1 (was 14.2.32 when this plan was written)
- **React**: 19.3.0 (was 18.3.1)
- **Node.js**: 22 (Docker and CI; was 18)
- **ESLint**: 10.9.1 (was 8.57.0)

## 🎯 Upgrade Priorities

### Priority 1: Security & Stability (Immediate)
- ✅ **COMPLETED**: Next.js 14.2.5 → 14.2.32 (Security fixes)
- ✅ **COMPLETED**: Security headers implementation
- ⚠️ **PENDING**: Address PrismJS vulnerability

### Priority 2: Performance & Modernization (Short-term)
- ⚠️ **PLANNED**: Next.js 14 → 15
- ⚠️ **PLANNED**: React 18 → 19
- ⚠️ **PLANNED**: ESLint 8 → 9

### Priority 3: Developer Experience (Medium-term)
- ⚠️ **PLANNED**: TypeScript migration
- ⚠️ **PLANNED**: Modern build tooling
- ⚠️ **PLANNED**: Enhanced testing framework

## 📋 Detailed Upgrade Plans

### Next.js 14 → 15 Migration

#### Pre-Migration Checklist
- [ ] Review [Next.js 15 Migration Guide](https://nextjs.org/docs/upgrading)
- [ ] Audit all API routes for breaking changes
- [ ] Test all dynamic routes and static generation
- [ ] Verify image optimization compatibility
- [ ] Check middleware compatibility
- [ ] Test build and deployment process

#### Breaking Changes to Address
1. **App Router Changes**
   - Review any app directory usage
   - Update routing patterns if needed

2. **API Routes**
   - Verify all API routes work with new version
   - Test error handling and response formats

3. **Build Configuration**
   - Update `next.config.js` for new features
   - Test standalone output mode

#### Migration Steps
```bash
# 1. Create feature branch
git checkout -b upgrade/nextjs-15

# 2. Update package.json
npm install next@latest react@latest react-dom@latest

# 3. Run tests and build
npm run build
npm run lint

# 4. Test locally
npm run dev

# 5. Deploy to staging
# 6. Run full regression tests
# 7. Deploy to production
```

#### Rollback Plan
- Keep previous Docker image tagged
- Maintain feature branch for quick rollback
- Document rollback procedures

### React 18 → 19 Migration

#### Pre-Migration Checklist
- [ ] Review [React 19 Release Notes](https://react.dev/blog/2024/02/15/react-labs-what-we-have-been-working-on-february-2024)
- [ ] Audit all React hooks usage
- [ ] Test concurrent features
- [ ] Verify third-party library compatibility
- [ ] Test server-side rendering

#### Breaking Changes to Address
1. **Hook Changes**
   - Review all custom hooks
   - Test useEffect and useState patterns

2. **Component Changes**
   - Test all component lifecycle methods
   - Verify error boundaries

3. **Third-party Libraries**
   - Update react-syntax-highlighter
   - Test lucide-react compatibility
   - Verify MDX compatibility

#### Migration Steps
```bash
# 1. Update React packages
npm install react@latest react-dom@latest

# 2. Update React types
npm install @types/react@latest @types/react-dom@latest

# 3. Test all components
npm run build
npm run lint

# 4. Test in development
npm run dev
```

### ESLint 8 → 9 Migration

#### Pre-Migration Checklist
- [ ] Review [ESLint 9 Migration Guide](https://eslint.org/docs/latest/use/migrate-to-v9)
- [ ] Audit current ESLint configuration
- [ ] Test all linting rules
- [ ] Update custom rules if any

#### Breaking Changes to Address
1. **Configuration Format**
   - Update `eslint.config.mjs` for new format
   - Test all rule configurations

2. **Rule Changes**
   - Review deprecated rules
   - Update rule configurations

#### Migration Steps
```bash
# 1. Update ESLint
npm install eslint@latest eslint-config-next@latest

# 2. Update configuration
# Update eslint.config.mjs for new format

# 3. Test linting
npm run lint

# 4. Fix any new linting issues
```

## 🔧 Technical Improvements

### Performance Optimizations

#### Current Issues
- Large page data warnings (2.6MB+ for theology posts)
- Slow build times
- Large bundle sizes

#### Planned Improvements
1. **Content Optimization**
   - Implement content pagination
   - Add lazy loading for images
   - Optimize MDX processing

2. **Build Optimization**
   - Implement incremental builds
   - Add build caching
   - Optimize webpack configuration

3. **Bundle Optimization**
   - Implement code splitting
   - Add tree shaking
   - Optimize third-party imports

### Developer Experience Improvements

#### Planned Enhancements
1. **TypeScript Migration**
   - Gradual migration strategy
   - Type definitions for all components
   - Enhanced IDE support

2. **Testing Framework**
   - Jest configuration
   - React Testing Library
   - E2E testing with Playwright

3. **Development Tools**
   - Enhanced debugging tools
   - Better error reporting
   - Development environment improvements

## 📊 Migration Timeline

### Phase 1: Foundation (Weeks 1-2)
- [ ] Complete security audit
- [ ] Set up testing environment
- [ ] Create migration documentation
- [ ] Set up staging environment

### Phase 2: Core Upgrades (Weeks 3-6)
- [ ] Next.js 14 → 15 migration
- [ ] React 18 → 19 migration
- [ ] ESLint 8 → 9 migration
- [ ] Comprehensive testing

### Phase 3: Optimization (Weeks 7-10)
- [ ] Performance optimizations
- [ ] Bundle size reduction
- [ ] Build time improvements
- [ ] Developer experience enhancements

### Phase 4: Advanced Features (Weeks 11-14)
- [ ] TypeScript migration
- [ ] Enhanced testing
- [ ] Advanced tooling
- [ ] Documentation updates

## 🧪 Testing Strategy

### Automated Testing
- [ ] Unit tests for all components
- [ ] Integration tests for API routes
- [ ] E2E tests for critical user flows
- [ ] Performance regression tests

### Manual Testing
- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness
- [ ] Accessibility testing
- [ ] Content validation

### Performance Testing
- [ ] Lighthouse audits
- [ ] Bundle size analysis
- [ ] Build time monitoring
- [ ] Runtime performance metrics

## 🚨 Risk Mitigation

### High-Risk Areas
1. **Breaking Changes**: Comprehensive testing required
2. **Third-party Dependencies**: Compatibility verification needed
3. **Build Process**: Staging deployment validation
4. **Performance**: Regression testing essential

### Mitigation Strategies
1. **Feature Flags**: Gradual rollout capability
2. **Rollback Procedures**: Quick recovery mechanisms
3. **Monitoring**: Real-time performance tracking
4. **Documentation**: Comprehensive migration guides

## 📈 Success Metrics

### Technical Metrics
- **Build Time**: Target < 2 minutes
- **Bundle Size**: Target < 500KB initial load
- **Lighthouse Score**: Target > 90 for all categories
- **Test Coverage**: Target > 80%

### Business Metrics
- **Page Load Speed**: Target < 2 seconds
- **User Experience**: No regression in usability
- **Uptime**: Maintain 99.9% availability
- **Error Rate**: < 0.1% error rate

## 📚 Resources

### Documentation
- [Next.js Migration Guide](https://nextjs.org/docs/upgrading)
- [React Migration Guide](https://react.dev/learn/upgrading)
- [ESLint Migration Guide](https://eslint.org/docs/latest/use/migrate-to-v9)

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Bundle Analyzer](https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer)
- [React DevTools](https://react.dev/learn/react-developer-tools)

---

**Last Updated**: $(date)
**Next Review**: $(date -d '+2 weeks')
**Maintained By**: Development Team
