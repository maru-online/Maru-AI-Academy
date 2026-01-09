/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exclude the old API folder from the build
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // API rewrites to backend (only for modules API - auth and other routes are local)
  async rewrites() {
    return [
      {
        source: '/api/modules',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/modules`,
      },
      {
        source: '/api/modules/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/modules/:path*`,
      },
    ];
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
        ],
      },
    ];
  },
};

module.exports = nextConfig;
