/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  productionBrowserSourceMaps: false,
  optimizeFonts: false,
  fastRefresh: true,
  swcMinify: true,
  minify: false,
};

module.exports = nextConfig;
