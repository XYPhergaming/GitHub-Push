/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  // Optional: Enable experimental features if needed
  // experimental: { appDir: true },
};

module.exports = nextConfig;