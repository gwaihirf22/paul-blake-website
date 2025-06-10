/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Ensure static assets are properly handled in standalone mode
  experimental: {
    outputFileTracingRoot: __dirname,
  },
  // Disable image optimization to avoid issues with static serving
  images: {
    unoptimized: true,
  },
  // Custom webpack config to ensure public assets are included
  webpack: (config, { isServer }) => {
    return config;
  },
};

module.exports = nextConfig; 