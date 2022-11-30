/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["https://web-production-5638.up.railway.app"],
  },
};

module.exports = {
  nextConfig,
  env: {
    BASE_TOKEN: process.env.NEXT_PUBLIC_TOKEN,
  },
};
