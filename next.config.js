/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Next 15 moved this out of `experimental` to the top level.
  outputFileTracingRoot: __dirname,
  // Disable image optimization to avoid issues with static serving
  images: {
    unoptimized: true,
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  // NOTE: the previous `webpack: (config) => config` hook was removed.
  // It was a no-op (returned config unchanged), but its mere presence made
  // Next 16 refuse to build, because Turbopack is now the default and a
  // webpack config implies an unmigrated custom build. Nothing was lost.
};

module.exports = nextConfig;
