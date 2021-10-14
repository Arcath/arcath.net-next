const withImages = require('next-images')
const withPWA = require('next-pwa')

const nextConfig = {
  webpack5: true,
  target: 'serverless',
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development'
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      loader: 'esbuild-loader',
      options: {
        loader: 'tsx', // Or 'ts' if you don't need tsx
        target: 'es2015'
      }
    })

    return config
  }
}

module.exports = withPWA(withImages(nextConfig))
