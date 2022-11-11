/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
    unoptimized: true,
  },
};

/**
 * loaderのエラーを修正する
 * @link https://stackoverflow.com/a/70492617
 * */
const withTM = require('next-transpile-modules')([
  '@1k-cove/md-editor',
  '@1k-cove/common',
]);

module.exports = withTM(nextConfig);
