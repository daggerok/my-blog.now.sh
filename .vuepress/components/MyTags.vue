<template>
  <div>
    <h1>My tags</h1>
    <pre style="background-color: transparent">{{ tags }}</pre>
  </div>
</template>

<script>
import tagsServices from '@/my-services/tags';

export default {
  name: 'MyTags',
  computed: {
    tags() {
      return tagsServices.getAllTags(this.$site).sort();
      // return this.$site.pages
      //                  .filter(page => !!page.path)
      //                  // .filter(page => page.path.endsWith('.html'))
      //                  .filter(htmlPage => !!htmlPage.frontmatter)
      //                  .map(htmlPage => htmlPage.frontmatter)
      //                  .filter(frontmatter => !!frontmatter.tags || !!frontmatter.tag)
      //                  .flatMap(frontmatter => !!frontmatter.tags ? arrayOf(frontmatter.tags) : arrayOf(frontmatter.tag))
      //                  .filter((tag, index, tags) => tags.indexOf(tag) === index);
    },
  },
};
</script>
