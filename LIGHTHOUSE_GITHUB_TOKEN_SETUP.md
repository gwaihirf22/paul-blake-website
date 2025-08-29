# Lighthouse CI GitHub Token Setup (Optional)

## Overview

Setting up a GitHub token for Lighthouse CI enables enhanced integration features like posting PR comments with performance results and tracking performance over time.

## Why Set Up a GitHub Token?

### Benefits:
- **PR Comments**: Automatic comments on pull requests with Lighthouse results
- **Status Checks**: Pass/fail status checks on GitHub PRs
- **Performance Tracking**: Historical performance data in GitHub
- **Better Integration**: Enhanced workflow integration with GitHub

### Without Token:
- Lighthouse CI still works perfectly
- Results are uploaded to temporary public storage
- You just miss the GitHub-specific integration features

## Setup Instructions

### Option 1: GitHub App (Recommended)

1. **Install the Lighthouse CI GitHub App**:
   - Go to: https://github.com/apps/lighthouse-ci
   - Click "Install" and select your repository
   - This automatically sets up the token

### Option 2: Personal Access Token

1. **Create a Personal Access Token**:
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Click "Generate new token (classic)"
   - Select scopes: `repo`, `workflow`
   - Copy the generated token

2. **Add to Repository Secrets**:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `LHCI_GITHUB_APP_TOKEN`
   - Value: Your copied token

## Current Configuration

The workflow is already configured to use the token if available:

```yaml
env:
  LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

## Testing

### With Token:
- Push changes to see PR comments with Lighthouse results
- Status checks will appear on pull requests
- Performance tracking available in GitHub

### Without Token:
- Lighthouse CI works normally
- Results available at temporary URLs (like the ones you saw)
- No GitHub integration features

## Troubleshooting

### Common Issues:

1. **Token Permissions**: Ensure token has `repo` and `workflow` scopes
2. **Repository Access**: For organization repos, ensure token has access
3. **App Installation**: If using GitHub App, ensure it's installed on the correct repository

### Debug Commands:

```bash
# Check if token is working
echo $LHCI_GITHUB_APP_TOKEN

# Test Lighthouse CI configuration
npx lhci healthcheck
```

## Current Status

✅ **Lighthouse CI is working without token** - You're already getting performance reports!

The token is **optional** and only adds GitHub-specific features. Your current setup with temporary public storage is perfectly functional for performance monitoring.

## Decision

You can:
1. **Skip the token** - Keep using Lighthouse CI as-is (fully functional)
2. **Add the token later** - Set up when you want GitHub integration features
3. **Set up now** - Follow the instructions above for enhanced integration

---

**Recommendation**: Start without the token since Lighthouse CI is already working perfectly. Add it later if you want PR comments and GitHub integration features.
