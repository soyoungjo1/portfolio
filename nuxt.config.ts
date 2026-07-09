export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    notionToken: process.env.NUXT_NOTION_TOKEN ?? '',
    notionRootPageId: '3826abc34c9b802eb3a5e85c56010d24',
    anthropicApiKey: process.env.ANTHROPIC_API_KEY ?? '',
    public: {
      imgBase: process.env.NUXT_PUBLIC_IMG_BASE ?? 'https://res.cloudinary.com/dphhpri3b/image/upload',
    },
  },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/fonts.css', '~/assets/css/icons.css'],
  app: {
    head: {
      title: 'JSY Portfolio',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'description', content: 'Frontend Developer & Designer Portfolio' },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&family=Inter:wght@100..900&display=swap',
        },
      ],
    },
  },
})
