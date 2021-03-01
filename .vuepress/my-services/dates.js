const dateOf = post => {
  if (!post || !post.frontmatter) throw 'Invalid post argument, requires at least: post.frontmatter';
  const ofValue = post.frontmatter.date || post.frontmatter.lastUpdated || '1975-01-01 00:00:00 GMT+0200';
  return new Date(ofValue);
}

module.exports = {
  dateOf,
};
