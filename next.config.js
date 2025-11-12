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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Link",
            value:
              '<https://noidung.dhcongdoan.vn>; rel="preconnect", <https://noidung.dhcongdoan.vn>; rel="dns-prefetch"'
          }
        ]
      }
    ];
  },
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: "deterministic",
        runtimeChunk: "single",
        minimize: !dev,
        minimizer: [
          ...(config.optimization.minimizer || [])
          // TerserPlugin is already included by Next.js, but we ensure it's optimized
        ],
        splitChunks: {
          chunks: "all",
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            default: false,
            vendors: false,
            vendor: {
              name: "vendor",
              chunks: "all",
              test: /[\\/]node_modules[\\/]/,
              priority: 20,
              reuseExistingChunk: true,
              enforce: true,
              minChunks: 1
            },
            react: {
              name: "react",
              chunks: "all",
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 30,
              reuseExistingChunk: true,
              enforce: true
            },
            apollo: {
              name: "apollo",
              chunks: "async",
              test: /[\\/]node_modules[\\/]@apollo[\\/]/,
              priority: 25,
              reuseExistingChunk: true,
              enforce: true
            },
            nextjs: {
              name: "nextjs",
              chunks: "async",
              test: /[\\/]node_modules[\\/]next[\\/]/,
              priority: 30,
              reuseExistingChunk: true,
              enforce: true
            },
            framerMotion: {
              name: "framer-motion",
              chunks: "async",
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 25,
              reuseExistingChunk: true,
              enforce: true
            },
            swiper: {
              name: "swiper",
              chunks: "async",
              test: /[\\/]node_modules[\\/]swiper[\\/]/,
              priority: 25,
              reuseExistingChunk: true,
              enforce: true
            },
            common: {
              name: "common",
              minChunks: 2,
              chunks: "async",
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
      "swiper",
      "lucide-react",
      "@heroicons/react"
    ]
  },
  // Optimize production builds
  swcMinify: true,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"]
          }
        : false
  }
};

module.exports = nextConfig;
