/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'm.media-amazon.com',
      'imagesvc.meredithcorp.io',
      's3.amazonaws.com',
    ],
  },
  i18n,
  env: {
    API_URL: process.env.API_URL,
    API_BASE_URL: process.env.API_BASE_URL,
    API_PROTOCOL: process.env.API_PROTOCOL,
    WS_PROTOCOL: process.env.WS_PROTOCOL,
  }
};

module.exports = nextConfig;
