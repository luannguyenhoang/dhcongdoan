/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "noidung.dhcongdoan.vn",
        pathname: "/**"
      }
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: "deterministic",
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            default: false,
            vendors: false,
            vendor: {
              name: "vendor",
              chunks: "all",
              test: /node_modules/,
              priority: 20,
              reuseExistingChunk: true
            },
            react: {
              name: "react",
              chunks: "all",
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              priority: 30,
              reuseExistingChunk: true
            },
            apollo: {
              name: "apollo",
              chunks: "all",
              test: /[\\/]node_modules[\\/]@apollo[\\/]/,
              priority: 25,
              reuseExistingChunk: true
            },
            nextjs: {
              name: "nextjs",
              chunks: "all",
              test: /[\\/]node_modules[\\/]next[\\/]/,
              priority: 30,
              reuseExistingChunk: true
            },
            common: {
              name: "common",
              minChunks: 2,
              chunks: "all",
              priority: 10,
              reuseExistingChunk: true
            }
          }
        }
      };
    }
    return config;
  },
  experimental: {
    optimizePackageImports: [
      "react-icons",
      "@apollo/client",
      "framer-motion",
      "swiper"
    ]
  }
};

module.exports = nextConfig;
