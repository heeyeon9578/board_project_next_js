// CommonJS 방식으로 수정
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      use: 'ignore-loader',
    });
    return config;
  },
}

module.exports = nextConfig;
