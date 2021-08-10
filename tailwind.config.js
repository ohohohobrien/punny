module.exports = {
    purge: [],
    /*

    REPLACE PURGE [] WITH THE BELOW WHEN BUILDING FOR PRODUCTION

    {
      enabled: true,
      content: ['./public/*.html', './public/*.js'],
    },
    */
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          primary: '#FF6363',
          secondary: {
            100: '#E2E2D5',
            200: '#888883',
          }
        },
        fontFamily: {
          body: ['Nunito']
        }
      },
    },
    variants: {
      extend: {
        animation: ['hover'],
      },
      transitionProperty: ['hover', 'focus'],
    },
    plugins: [],
  }