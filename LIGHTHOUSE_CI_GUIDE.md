# Lighthouse CI Guide

## Overview

Lighthouse CI has been implemented to provide automated performance, accessibility, best practices, and SEO auditing for the Paul Blake Website project. This ensures consistent quality and catches regressions before they reach production.

## What is Lighthouse CI?

Lighthouse CI is an automated testing tool that runs Google Lighthouse audits in CI/CD environments. It provides:

- **Performance auditing** - Page load times, bundle sizes, and optimization opportunities
- **Accessibility testing** - WCAG compliance and accessibility best practices
- **Best practices checking** - Security, modern web standards, and optimization
- **SEO analysis** - Search engine optimization and meta tag validation

## Implementation Details

### Files Added

1. **`lighthouserc.json`** - Local testing configuration (port 3002)
2. **`lighthouserc.ci.json`** - CI environment configuration (port 3000)
3. **`.github/workflows/lighthouse-ci.yml`** - GitHub Actions workflow
4. **Package scripts** - New npm commands for running audits

### NPM Scripts

```bash
# Run Lighthouse CI locally (requires build first)
npm run lighthouse:local

# Run Lighthouse CI for CI environment
npm run lighthouse:ci
```

### GitHub Actions Workflow

The workflow automatically:
1. Runs on every push to `main` branch and pull requests
2. Installs dependencies and builds the application
3. Executes Lighthouse CI audits on key pages
4. Uploads results to temporary public storage
5. Fails the build if quality thresholds aren't met

## Quality Thresholds

Current thresholds are set to warn (not fail) to establish baseline metrics:

| Category | Threshold | Action |
|----------|-----------|---------|
| Performance | 70% | Warn |
| Accessibility | 80% | Warn |
| Best Practices | 70% | Warn |
| SEO | 80% | Warn |

## Pages Audited

The following pages are automatically audited:
- Homepage (`/`)
- About page (`/about`)
- Blog index (`/blog`)
- Projects page (`/projects`)

## Local Testing

To run Lighthouse CI locally:

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Run Lighthouse CI**:
   ```bash
   npm run lighthouse:local
   ```

3. **View results**: Results will be displayed in the terminal and saved to `.lighthouseci/` directory

## CI/CD Integration

### GitHub Actions

The workflow runs automatically on:
- Pushes to `main` branch
- Pull requests targeting `main` branch

### Results

- **Success**: Build passes, results available in workflow logs
- **Failure**: Build fails if critical thresholds aren't met
- **Reports**: Detailed reports uploaded to temporary public storage

## Troubleshooting

### Common Issues

1. **Port conflicts**: Local testing uses port 3002 to avoid conflicts
2. **Build failures**: Ensure `npm run build` completes successfully first
3. **Timeout issues**: Server startup timeout set to 30 seconds

### Debug Commands

```bash
# Check Lighthouse CI health
npx lhci healthcheck

# Run with verbose output
npx lhci autorun --config=./lighthouserc.json --debug

# View configuration
npx lhci autorun --print-config
```

## Future Enhancements

### Planned Improvements

1. **Stricter thresholds** - Increase quality requirements as baseline improves
2. **More pages** - Add blog post auditing for dynamic content
3. **Performance budgets** - Set specific limits for bundle sizes and metrics
4. **Historical tracking** - Implement persistent result storage
5. **Slack/email notifications** - Alert team of failures

### Advanced Configuration

Consider implementing:
- **Custom assertions** for specific business requirements
- **Multiple device auditing** (mobile/desktop)
- **Geographic testing** from different regions
- **A/B testing integration** for performance comparisons

## Benefits

### For Development

- **Early detection** of performance regressions
- **Consistent quality** across all deployments
- **Accessibility compliance** ensuring inclusive design
- **SEO optimization** maintaining search visibility

### For Users

- **Faster page loads** through performance monitoring
- **Better accessibility** for users with disabilities
- **Improved search rankings** through SEO optimization
- **Modern web standards** for better browser compatibility

## Maintenance

### Regular Tasks

1. **Review thresholds** monthly and adjust based on improvements
2. **Update configurations** when adding new pages or features
3. **Monitor results** for trends and regressions
4. **Update Lighthouse CI** dependency periodically

### Monitoring

- Check GitHub Actions workflow results regularly
- Review Lighthouse reports for optimization opportunities
- Track performance trends over time
- Address failures promptly to maintain quality

---

**Note**: This implementation provides a solid foundation for automated quality assurance. As the project evolves, consider enhancing the configuration with more specific requirements and stricter thresholds.
