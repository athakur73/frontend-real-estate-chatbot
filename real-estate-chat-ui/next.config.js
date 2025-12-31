/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: 'http://98.81.182.8:8000/:path*'
      }
    ];
  }
};

module.exports = nextConfig;
