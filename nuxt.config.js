import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Rendering: https://nuxtjs.org/docs/2.x/features/rendering-modes/
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - vounty_web',
    title: 'vounty_web',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/main.scss',
    '@ditdot-dev/vue-flow-form/dist/vue-flow-form.css',
    '~/assets/css/theme-custom.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-horizontal.js',
    '~/plugins/vue-currency-input.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://google-analytics.nuxtjs.org/
    '@nuxtjs/google-analytics',
    // https://github.com/Developmint/nuxt-purgecss
    'nuxt-purgecss',
    // https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // https://i18n.nuxtjs.org/
    'nuxt-i18n',
    // https://sitemap.nuxtjs.org/
    '@nuxtjs/sitemap',
    // https://github.com/nuxt-community/robots-module
    '@nuxtjs/robots',
    // https://google-fonts.nuxtjs.org/
    '@nuxtjs/google-fonts',
    // https://github.com/WilliamDASILVA/nuxt-stripe-module
    'nuxt-stripe-module',
    // https://dm4t2.github.io/vue-currency-input/
    'vue-currency-input/nuxt'
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/scss/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#ffffff',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Google Analytics module configuration: https://google-analytics.nuxtjs.org/options
  googleAnalytics: {},

  // PurgeCSS module configuration: https://github.com/Developmint/nuxt-purgecss#options
  purgeCSS: {
    enabled: false
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: process.env.BASE_URL
  },

  // Auth module configuration: https://auth.nuxtjs.org/api/options/
  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        clientId: process.env.CLIENT_ID,
        grantType: 'password',
        token: {
          property: 'access_token',
          required: true,
          type: 'Bearer'
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          required: true
        },
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: { url: '/o/token/', method: 'post' },
          refresh: { url: '/o/token/', method: 'post' },
          logout: { url: '/o/revoke_token/', method: 'post' },
          user: { url: '/me/user/', method: 'get' }
        }
      }
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: false,
    manifest: {
      lang: 'en'
    }
  },

  // Style Resources module configuration: https://github.com/nuxt-community/style-resources-module
  styleResources: {
    scss: [
      '~/assets/scss/functions.scss',
      '~/assets/scss/mixins.scss',
      '~/assets/scss/variables.scss'
    ]
  },

  // i18n module configuration: https://i18n.nuxtjs.org/options-reference
  i18n: {},

  // Sitemap module configuration: https://sitemap.nuxtjs.org/guide/configuration
  sitemap: {
    hostname: 'https://vounty.io'
  },

  // Robots module configuration: https://github.com/nuxt-community/robots-module#options
  robots: {},

  // Google Fonts module configuration: https://google-fonts.nuxtjs.org/options
  googleFonts: {
    families: {
      Roboto: true,
      Rye: true
    }
  },

  // Stripe module configuration: https://github.com/WilliamDASILVA/nuxt-stripe-module#options
  stripe: {
    publishableKey: process.env.STRIPE_KEY,
    locale: 'en'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: {
      ignoreOrder: false
    }
  }
}
