/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admindhcd.devlab.info.vn",
        pathname: "/**"
      }
    ],
    unoptimized: true
  }
};

module.exports = nextConfig;
