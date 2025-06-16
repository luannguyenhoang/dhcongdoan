/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ldaadmin.devlab.info.vn",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
