/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bật React Strict Mode để phát hiện các vấn đề tiềm ẩn trong quá trình phát triển
  // Giúp cảnh báo về các API không an toàn, lifecycle methods cũ, v.v.
  reactStrictMode: true,

  // Cấu hình tối ưu hóa hình ảnh với Next.js Image Optimization
  images: {
    // Cho phép tải hình ảnh từ domain bên ngoài (noidung.dhcongdoan.vn)
    // Bảo mật: chỉ cho phép domain cụ thể, không cho phép tất cả domain
    remotePatterns: [
      {
        protocol: "https",
        hostname: "noidung.dhcongdoan.vn",
        pathname: "/**"
      }
    ],
    // Định dạng hình ảnh hiện đại: AVIF (tốt nhất) và WebP (fallback)
    // Giúp giảm kích thước file 30-50% so với JPEG/PNG, cải thiện tốc độ tải
    formats: ["image/avif", "image/webp"],
    // Kích thước hình ảnh cho các thiết bị khác nhau (responsive images)
    // Next.js sẽ tự động tạo nhiều kích thước và chọn phù hợp với viewport
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Kích thước hình ảnh nhỏ cho các icon, avatar, v.v.
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },

  // Bật nén Gzip/Brotli cho các response từ server
  // Giảm kích thước file khi truyền qua mạng, tăng tốc độ tải trang
  compress: true,

  // Ẩn header "X-Powered-By: Next.js" để bảo mật
  // Tránh lộ thông tin về công nghệ đang sử dụng cho attacker
  poweredByHeader: false,

  // Tự động tạo ETags cho các file tĩnh
  // ETags giúp browser cache hiệu quả hơn, giảm bandwidth và tăng tốc độ
  generateEtags: true,

  // Thêm custom HTTP headers cho tất cả các routes
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Link",
            // Preconnect và DNS-prefetch giúp thiết lập kết nối sớm với domain API
            // Giảm thời gian chờ khi thực hiện request đầu tiên đến API
            // Cải thiện hiệu suất, đặc biệt với các request quan trọng (LCP, FCP)
            value:
              '<https://noidung.dhcongdoan.vn>; rel="preconnect", <https://noidung.dhcongdoan.vn>; rel="dns-prefetch"'
          }
        ]
      }
    ];
  },
  // Tùy chỉnh cấu hình Webpack để tối ưu hóa bundle size và code splitting
  webpack: (config, { isServer, dev }) => {
    // Chỉ áp dụng tối ưu hóa cho client-side bundle (không áp dụng cho server-side)
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        // Module IDs dạng deterministic: giữ nguyên ID giữa các lần build
        // Giúp long-term caching hiệu quả, browser có thể cache chunks lâu hơn
        moduleIds: "deterministic",
        // Tách runtime code thành một chunk riêng
        // Runtime code ít thay đổi, có thể cache lâu, giảm tải lại khi code thay đổi
        runtimeChunk: "single",
        // Chỉ minify trong production (giảm thời gian build khi dev)
        minimize: !dev,
        minimizer: [
          ...(config.optimization.minimizer || [])
          // TerserPlugin đã được Next.js tự động thêm, giữ nguyên cấu hình mặc định
        ],
        // Code Splitting: chia nhỏ bundle thành nhiều chunks để tối ưu tải trang
        splitChunks: {
          // Chia tất cả các loại chunks (initial, async, all)
          chunks: "all",
          // Giới hạn số lượng chunks được tải ban đầu (tránh quá nhiều HTTP requests)
          // Giảm từ 25 xuống 20 để giảm Script Parsing & Compilation time
          maxInitialRequests: 20,
          // Chỉ tạo chunk mới nếu kích thước >= 20KB
          // Tránh tạo quá nhiều chunks nhỏ, giảm overhead của HTTP requests
          minSize: 20000,
          // Giới hạn kích thước tối đa của mỗi chunk
          // Chunks lớn hơn sẽ bị split, giảm parsing/compilation time
          maxSize: 244000,
          // Nhóm các modules vào các chunks dựa trên quy tắc
          cacheGroups: {
            // Tắt cache groups mặc định
            default: false,
            vendors: false,
            // Nhóm tất cả node_modules vào vendor chunk
            vendor: {
              name: "vendor",
              chunks: "all", // Bao gồm cả initial và async chunks
              test: /[\\/]node_modules[\\/]/, // Match tất cả packages trong node_modules
              priority: 20, // Độ ưu tiên thấp hơn các groups cụ thể (react, apollo, v.v.)
              reuseExistingChunk: true, // Tái sử dụng chunk đã tồn tại nếu có
              enforce: true, // Bắt buộc tạo chunk này ngay cả khi vi phạm minSize
              minChunks: 1 // Tạo chunk nếu module được import ít nhất 1 lần
            },
            // Tách React và React-DOM thành chunk riêng (ưu tiên cao)
            // React là core library, được dùng ở nhiều nơi, tách riêng để cache tốt hơn
            react: {
              name: "react",
              chunks: "all", // Load ngay từ đầu (critical)
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 30, // Độ ưu tiên cao nhất
              reuseExistingChunk: true,
              enforce: true
            },
            // Tách Apollo Client thành chunk riêng, load async (không block initial load)
            // Apollo chỉ cần khi có GraphQL queries, không cần ngay từ đầu
            apollo: {
              name: "apollo",
              chunks: "async", // Chỉ load khi cần (lazy load)
              test: /[\\/]node_modules[\\/]@apollo[\\/]/,
              priority: 25,
              reuseExistingChunk: true,
              enforce: true
            },
            // Tách Next.js runtime thành chunk riêng, load async
            // Next.js code chỉ cần khi có routing/navigation, không cần ngay từ đầu
            nextjs: {
              name: "nextjs",
              chunks: "async", // Lazy load
              test: /[\\/]node_modules[\\/]next[\\/]/,
              priority: 30, // Độ ưu tiên cao (nhưng vẫn async)
              reuseExistingChunk: true,
              enforce: true
            },
            // Tách Framer Motion thành chunk riêng (animation library)
            // Chỉ cần khi có animations, load async để không block initial render
            framerMotion: {
              name: "framer-motion",
              chunks: "async",
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 25,
              reuseExistingChunk: true,
              enforce: true
            },
            // Tách Swiper thành chunk riêng (carousel/slider library)
            // Chỉ cần khi có sliders, load async để giảm initial bundle size
            swiper: {
              name: "swiper",
              chunks: "async",
              test: /[\\/]node_modules[\\/]swiper[\\/]/,
              priority: 25,
              reuseExistingChunk: true,
              enforce: true
            },
            // Nhóm code dùng chung (được import ở ít nhất 2 nơi)
            // Tránh duplicate code, giảm bundle size tổng thể
            common: {
              name: "common",
              minChunks: 2, // Chỉ tạo chunk nếu được dùng ở ít nhất 2 nơi
              chunks: "async", // Load async
              priority: 10, // Độ ưu tiên thấp nhất
              reuseExistingChunk: true
            }
          }
        }
      };
    }
    return config;
  },
  // Tính năng thử nghiệm: Tối ưu hóa import từ các packages lớn
  // Tự động tree-shake và chỉ import những phần được sử dụng thực sự
  // Giảm đáng kể bundle size cho các icon libraries và animation libraries
  experimental: {
    optimizePackageImports: [
      "react-icons", // Icon library lớn, chỉ import icons được dùng
      "@apollo/client", // Chỉ import Apollo modules cần thiết
      "framer-motion", // Animation library, tree-shake unused animations
      "swiper", // Carousel library, chỉ import modules được dùng
      "lucide-react", // Icon library, chỉ import icons được dùng
      "@heroicons/react" // Icon library, chỉ import icons được dùng
    ]
  },
  // Sử dụng SWC minifier thay vì Terser (nhanh hơn 7x, hiệu quả hơn)
  // SWC là Rust-based compiler, minify code nhanh và tốt hơn
  swcMinify: true,
  // Cấu hình compiler để tối ưu production build
  compiler: {
    // Xóa tất cả console.log, console.info, console.debug trong production
    // Giữ lại console.error và console.warn để debug lỗi
    // Giảm bundle size và cải thiện performance
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"] // Giữ lại error và warn để debug
          }
        : false // Không xóa console trong development
  }
};

module.exports = nextConfig;
