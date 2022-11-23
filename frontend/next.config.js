/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["2eff.lukso.dev"],
  },
};

module.exports = nextConfig;
