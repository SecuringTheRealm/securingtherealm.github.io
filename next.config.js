/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    reactStrictMode: true,
    // Images config at the top level, not in experimental
    images: { unoptimized: true }
  };

module.exports = nextConfig
