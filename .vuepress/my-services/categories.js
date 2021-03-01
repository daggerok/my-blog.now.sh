const { arrayOf } = require('@/my-services/arrays');

const getAllCategories = this$site => {
  if (!this$site || !this$site.pages) throw 'Invalid $site argument, requires at least: $site.pages';
  return this$site.pages
                  .filter(page => !!page.path)
                  // .filter(page => page.path.endsWith('.html'))
                  .filter(htmlPage => !!htmlPage.frontmatter)
                  .map(htmlPage => htmlPage.frontmatter)
                  .filter(frontmatter => !!frontmatter.categories || !!frontmatter.category)
                  .flatMap(frontmatter => arrayOf(!!frontmatter.categories ? frontmatter.categories : frontmatter.category))
                  .filter((category, index, categories) => categories.indexOf(category) === index);
}

module.exports = {
  getAllCategories,
};
