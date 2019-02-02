module.exports = {
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  base: '/',
  themeConfig: {
    repo: 'daggerok/my-blog.now.sh',
    lastUpdated: 'Last Updated', // string | boolean
    '/': {
      sidebar: 'auto'
    },
    sidebarDepth: 2,
    navbar: true,
  }
};
