module.exports = {
  lang: 'ru-RU',
  title: 'Фото в Одессе',
  description: 'Быстро. Качественно. Круто.',
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
      { text: 'Главная', link: '/' },
      { text: 'Услуги', link: '/services/' },
      { text: 'Цены', link: '/price/' },
      { text: 'Блог', link: '/blog/' },
      // { text: 'Tags', link: '/tag/' },
      // { text: 'Categories', link: '/category/' },
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
  //   plugins: [
  //     'markdown-it-footnote'
  //   ]
  // }
};
