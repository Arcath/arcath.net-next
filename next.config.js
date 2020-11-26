const withImages = require('next-images')


const nextConfig = {
  target: 'serverless'
}

module.exports = withImages(nextConfig)