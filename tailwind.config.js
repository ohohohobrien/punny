<<<<<<< HEAD
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
=======
module.exports = {
    purge: {
      enabled: true,
      content: ['./public/*.html', './public/*.js'],
    },
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
>>>>>>> 08013abcff86057eb084a3dd49e2852ccb86b7f2
  }