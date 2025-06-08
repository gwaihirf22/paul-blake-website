# Paul Blake Website

This is a personal website and blog built with [Next.js](https://nextjs.org) using the Pages Router. The site features a main blog and a dedicated theology section for Christian faith, theological discussions, and philosophy.

## Features

- **Personal Blog**: Thoughts on development, technology, and general interests
- **Theology Section**: Dedicated area for Christian faith, theology, philosophy, and science discussions
- **MDX Support**: Write blog posts in Markdown with React component support
- **Responsive Design**: Clean, modern UI that works on all devices
- **Static Site Generation**: Optimized performance with Next.js SSG
- **Docker Support**: Containerized for easy deployment

## Project Structure

```
├── content/
│   └── blog/
│       ├── theology/           # Theological blog posts
│       ├── first-post.mdx     # Regular blog posts
│       └── second-post.mdx
├── pages/
│   ├── blog/
│   │   ├── theology/          # Theology section pages
│   │   │   ├── index.js       # Theology blog index
│   │   │   └── [slug].js      # Individual theology posts
│   │   ├── index.js           # Main blog index
│   │   └── [slug].js          # Individual blog posts
│   └── index.js               # Homepage
└── styles/
    └── globals.css
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

### Docker Development

You can also run the project using Docker:

```bash
# Build the image
docker build -t paul-blake-website .

# Run the container
docker run -p 3000:3000 paul-blake-website
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
- Theological discussions and apologetics
- Philosophy and worldview topics
- Science and faith intersection

## Deployment

### Automated Deployment to Unraid

This project includes a GitHub Actions workflow that automatically deploys to an Unraid server on every push to the `main` branch.

#### Workflow Features:
- **Docker Build**: Creates optimized Docker image for `linux/amd64`
- **SSH Deployment**: Transfers and deploys to Unraid server
- **Auto Cleanup**: Removes old Docker images to save space

#### Required GitHub Secrets:

Set these in your repository settings under **Settings** → **Secrets and variables** → **Actions**:

| Secret | Description | Example |
|--------|-------------|---------|
| `UNRAID_HOST` | Unraid server IP address | `192.168.1.100` |
| `UNRAID_USERNAME` | Unraid username | `root` |
| `SSH_PRIVATE_KEY` | SSH private key for Unraid access | `-----BEGIN OPENSSH PRIVATE KEY-----...` |

#### Optional Docker Hub Secrets (if pushing to registry):
| Secret | Description |
|--------|-------------|
| `DOCKER_USERNAME` | Docker Hub username |
| `DOCKER_TOKEN` | Docker Hub access token |

#### Deployment Process:
1. Code is pushed to `main` branch
2. GitHub Actions builds Docker image
3. Image is transferred to Unraid server via SSH
4. Docker Compose restarts container with new image
5. Old images are cleaned up automatically

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
