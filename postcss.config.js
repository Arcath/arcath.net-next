const purgecss = [
  '@fullhuman/postcss-purgecss',
  {
    // Specify the paths to all of the template files
    content: [
      './pages/**/*.{js,jsx,ts,tsx}',
      './lib/**/*.{js,jsx,ts,tsx}',
      './styles/**/*.css'
    ],
    defaultExtractor: (content) => {
      const matches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []

      return matches
    }
  },
];

module.exports = {
  plugins: [
    'tailwindcss',
    process.env.NODE_ENV === 'production' ? purgecss : undefined,
    'postcss-preset-env'
  ],
}
