<template>
  <div>
    <h1>My tags</h1>
    <pre style="background-color: transparent">{{ tags }}</pre>
  </div>
</template>

<script>
export default {
  name: 'MyTags',
  computed: {
    tags() {
      return this.$site.pages
                       .filter(page => !!page.path)
                       // .filter(page => page.path.endsWith('.html'))
                       .filter(htmlPage => !!htmlPage.frontmatter)
                       .map(htmlPage => htmlPage.frontmatter)
                       .filter(frontmatter => !!frontmatter.tags || !!frontmatter.tag)
                       .flatMap(frontmatter => !!frontmatter.tags ? frontmatter.tags : [frontmatter.tag])
                       .filter((tag, index, tags) => tags.indexOf(tag) === index);
    },
  },
};
</script>
