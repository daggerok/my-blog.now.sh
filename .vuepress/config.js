const base = !!process.env.GITHUB_PAGES ? '/my-blog/' : '/';

module.exports = {
  extend: '@vuepress/theme-default', // extend the default VuePress theme
  theme: 'default-prefers-color-scheme',
  lang: 'ru-RU',
  title: 'Мой блог',
  description: 'Делай дело',
  base,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  docsDir: '.',
  themeConfig: {
    prefersTheme: 'dark',
    smoothScroll: true,
    serviceWorker: {
      updatePopup: true,
    },
    nav: [
      { text: 'Блог', link: '/' },
      { text: 'Обо мне', link: '/about/' },
      { text: 'Теги', link: '/tags/' },
      { text: 'Категории', link: '/categories/' },
    ],
    // repo: 'daggerok/my-blog.now.sh',
    // lastUpdated: 'Обновлено', // string | boolean
  },
  plugins: [
    // '@vuepress/blog',
    '@vuepress/nprogress',
    '@vuepress/medium-zoom',
    '@vuepress/back-to-top',
    '@vuepress/pagination',
    '@vuepress/active-header-links', {
      sidebarLinkSelector: '.sidebar-link',
      headerAnchorSelector: '.header-anchor',
      headerTopOffset: 120
    },
  ],
  markdown: {
    lineNumbers: true,
    extendMarkdown: md => {
      md.use(require('markdown-it-vuepress-code-snippet-enhanced'));
    },
  },
  // chainWebpack (config, isServer) { },
  alias: {
    '@': require('path').resolve(process.cwd(), '.vuepress'),
  },
};
