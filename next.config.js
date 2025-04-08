/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    reactStrictMode: true,
    // In Next.js 13+, the images config needs to be placed correctly
    experimental: {
      images: { unoptimized: true }
    }
  };

module.exports = nextConfig
