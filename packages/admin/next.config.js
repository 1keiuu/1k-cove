/** @type {import('next').NextConfig} */

/**
 * loaderのエラーを修正する
 * @link https://stackoverflow.com/a/70492617
 * */
const withTM = require('next-transpile-modules')(['@1k-cove/md-editor']);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withTM(nextConfig);
