/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: ['lsiuhexcrnfmbzynigtt.supabase.co','cdn.sanity.io'],
  },
}

module.exports = nextConfig
