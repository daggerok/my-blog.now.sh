<template>
  <div>
    <div v-for="post in posts">
      <h2>
        <router-link :to="post.path">{{ post.frontmatter.title }}</router-link>
      </h2>
      <p>{{ post.frontmatter.description }}</p>
      <p><router-link :to="post.path">Read more</router-link></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Blog',
    computed: {
      posts() {
        return this.$site.pages
                   .filter(page => page.path.indexOf("/blog/") > -1)
                   .filter(page => page.path.endsWith('.html'))
                   .filter(page => page.frontmatter.published)
                   .sort((p1, p2) => p1.lastUpdated - p2.lastUpdated);
      },
    },
  };
</script>
