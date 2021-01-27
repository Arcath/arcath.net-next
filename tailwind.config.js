module.exports = {
  experimental: {
    darkModeVariant: true,
  },
  darkMode: 'class',
  dark: 'class',
  purge: false,
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.900"),
            a: {
              color: theme("colors.brand.dark"),
              transition: 'color 0.2s',
              textDecoration: "none",
              "&:hover": {
                color: theme("colors.brand.light")
              }
            },
          }
        },

        dark: {
          css: {
            color: theme('colors.gray.300'),
            h1: {
              color: theme("colors.gray.400")
            },
            h2: {
              color: theme("colors.gray.400")
            },
            h3: {
              color: theme("colors.gray.400")
            },
            h4: {
              color: theme("colors.gray.400")
            },
            h5: {
              color: theme("colors.gray.400")
            },
            h6: {
              color: theme("colors.gray.400")
            },
            blockquote: {
              color: theme('colors.gray.300')
            },
            code: {
              color: theme('colors.gray.500')
            }
          },
        },
      }),
      colors: {
        brand: {
          light: 'rgb(104, 109, 224)',
          dark: 'rgb(72, 52, 212)'
        },
        brands: {
          dev: '#0a0a0a',
          twitter: '#1da1f2',
          github: '#181717',
          youtube: '#ff0000',
          facebook: '#1877f2',
          reddit: '#ff4500'
        }
      },
      fontFamily: {
        headings: ["Montserrat", "Serif"]
      },
      gridTemplateColumns: {
        content: 'minmax(0.6rem, 1fr) minmax(0.6rem, 1fr) minmax(auto, 60ch) minmax(0.6rem, 1fr) minmax(0.6rem, 1fr)',
        header: 'minmax(0.6rem, 1fr) minmax(auto, 60ch) minmax(0.6rem, 1fr)'
      },
      width: {
        dbl: '200vw'
      },
      height: {
        dbl: '200vh'
      },
      minHeight: {
        '1/4': '25vh',
        '1/2': '50vh'
      },
      rotate: {
        gl: '-25deg'
      }
    }
  },
  variants: {
    typography: ["dark"],
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
