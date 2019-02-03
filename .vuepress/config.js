module.exports = {
  lang: 'ru-RU',
  title: 'Мой блог',
  description: 'Делай дело',
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  docsDir: '.',
  themeConfig: {
    serviceWorker: {
      updatePopup: true,
    },
    nav: [
      { text: 'Блог', link: '/' },
      { text: 'Обо мне', link: '/about/' },
    ],
    repo: 'daggerok/my-blog.now.sh',
    lastUpdated: 'Обновлено', // string | boolean
  },
  plugins: [
    '@vuepress/medium-zoom',
    '@vuepress/back-to-top',
    '@vuepress/pagination',
    '@vuepress/active-header-links', {
      sidebarLinkSelector: '.sidebar-link',
      headerAnchorSelector: '.header-anchor',
      headerTopOffset: 120
    },
  ],
  // markdown: {
  //   // slugify: 'limax',
  //   highlightedLineBackground: '#ffe9ad',
  //   hideLanguage: true,
  // }
};
