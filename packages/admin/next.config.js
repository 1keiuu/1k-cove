/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ],
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
