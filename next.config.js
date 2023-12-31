const { hostname } = require('os')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{hostname: 'i.ytimg.com'}],
      },
}

module.exports = nextConfig
