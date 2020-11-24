module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  darkMode: 'class',
  purge: false,
  theme: {
    extend: {
      colors: {
        brand: {
          light: 'rgb(104, 109, 224)',
          dark: 'rgb(72, 52, 212)'
        }
      },
      fontFamily: {
        headings: ["Montserrat", "Serif"]
      },
      gridTemplateColumns: {
        content: 'minmax(0.6rem, 1fr) minmax(0.6rem, 1fr) minmax(auto, 60ch) minmax(0.6rem, 1fr) minmax(0.6rem, 1fr)',
      },
      width: {
        dbl: '200vw'
      },
      height: {
        dbl: '200vh'
      },
      rotate: {
        gl: '-25deg'
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography')
  ],
}
