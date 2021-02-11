<template>
  <div>
    <h1>Tags</h1>
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
                       .filter(frontmatter => !!frontmatter.tags)
                       .flatMap(frontmatter => frontmatter.tags)
                       .filter((value, index, self) => self.indexOf(value) === index);
    },
  },
};
</script>
