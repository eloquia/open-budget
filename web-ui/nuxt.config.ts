// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["@nuxt/ui-pro"],

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/ui",
    "@vueuse/nuxt",
    "@nuxtjs/supabase",
  ],

  ui: {
    safelistColors: ["primary", "red", "orange", "green"],
  },

  colorMode: {
    disableTransition: true,
  },

  routeRules: {
    // Temporary workaround for prerender regression. see https://github.com/nuxt/nuxt/issues/27490
    "/": { prerender: true },
  },

  devtools: {
    enabled: true,
  },

  typescript: {
    strict: false,
  },

  future: {
    compatibilityVersion: 4,
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: "always",
        braceStyle: "1tbs",
        semi: true,
        quotes: "single",
      },
    },
  },

  compatibilityDate: "2024-07-11",

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false,
  },
})
