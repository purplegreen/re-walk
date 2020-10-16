export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    // eslint-disable-next-line prettier/prettier
    meta: [{
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    // eslint-disable-next-line prettier/prettier
    link: [{
        // eslint-disable-next-line prettier/prettier
      rel: 'icon',
        // eslint-disable-next-line prettier/prettier
      type: 'image/x-icon',
        // eslint-disable-next-line prettier/prettier
      href: '/favicon.png',
        // eslint-disable-next-line prettier/prettier
    }, 
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Barlow:wght@400;600&family=Open+Sans:wght@400&display=swap',
      },
    ],
  },

  sanity: {
    projectId: '0hyezyzt',
    dataset: 'production',
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    {
      src: '~/plugins/global.js',
    },
    {
      src: '~/plugins/filters.js',
    },
    {
      src: '~/plugins/vue-js-modal.js',
      // mode: 'client',
    },
    {
      src: '~/plugins/localStorage.js',
      ssr: false,
    },
    {
      src: '~/plugins/google-maps',
      ssr: true,
    },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */

  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/sanity',
    '@nuxtjs/google-fonts',

    // With options
    [
      '@nuxtjs/google-fonts',
      {
        /* module options */
        families: {
          Barlow: true,
        },
        /* module options */
      },
    ],
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: ['gsap', /^vue2-google-maps($|\/)/],
  },
}
