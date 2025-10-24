/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "noidung.dhcongdoan.vn",
        pathname: "/**"
      }
    ],
    unoptimized: true
  }
};

module.exports = nextConfig;
