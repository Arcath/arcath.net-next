const withImages = require('next-images')
const withPWA = require('next-pwa')

const nextConfig = {
  webpack5: true,
  target: 'serverless',
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development'
  }
}

module.exports = withPWA(withImages(nextConfig))
