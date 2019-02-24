<template>
  <div>
    <div v-for="post in posts">
      <MyPostPreview :title="post.frontmatter.title || 'title is undefined'"
                     :description="post.frontmatter.description || 'description is undefined'"
                     :path="post.path || '/'"
      />
    </div>
  </div>
</template>

<script>
  import MyPostPreview from './MyPostPreview';

  export default {
    name: 'MyPosts',
    components: {
      MyPostPreview,
    },
    computed: {
      posts() {
        return this.$site.pages
          .filter(page => page.frontmatter.type === 'post')
          .filter(post => post.path.endsWith('.html'))
          //.filter(page => { console.log(page); return page; })
          //.filter(html => html.frontmatter.published) // Avoid Drafts
          .sort((p1, p2) => {
            return !p1.date || !p2.date // if no date fields provided by frontmatter
              ? (p1.lastUpdated || 1) - (p2.lastUpdated || 0) // compare file git repo commit time
              : new Date(p1.date).getTime() - new Date(p2.date).getTime(); // otherwise use specified dates
          });
      },
    },
  };
</script>