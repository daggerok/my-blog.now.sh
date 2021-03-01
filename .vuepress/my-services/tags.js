const { arrayOf } = require('@/my-services/arrays');

const getAllTags = this$site => {
  if (!this$site || !this$site.pages) throw 'Invalid $site argument, requires at least: $site.pages';
  return this$site.pages
                  .filter(page => !!page.path)
                  // .filter(page => page.path.endsWith('.html'))
                  .filter(htmlPage => !!htmlPage.frontmatter)
                  .map(htmlPage => htmlPage.frontmatter)
                  .filter(frontmatter => !!frontmatter.tag || !!frontmatter.tags)
                  .flatMap(frontmatter => !!frontmatter.tag ? arrayOf(frontmatter.tag) : arrayOf(frontmatter.tags))
                  .filter((tag, index, tags) => tags.indexOf(tag) === index);
}

module.exports = {
  getAllTags,
};
