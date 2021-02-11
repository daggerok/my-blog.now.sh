<template>
  <div>
    <div v-for="post in posts">
      <MyPostPreview :title="post.frontmatter.title || 'title is undefined'"
                     :description="post.frontmatter.description || 'description is undefined'"
                     :path="post.path || '/'"
      />
    </div>
    <MyHomeHeroFooter/>
  </div>
</template>

<script>
import MyPostPreview from './MyPostPreview';
import MyHomeHeroFooter from './MyHomeHeroFooter';

export default {
  name: 'MyPosts',
  components: {
    MyPostPreview,
    MyHomeHeroFooter,
  },
  computed: {
    posts() {
      // // fix IDE code intelligence, or simple do: npm i -ED @mr-hope/vuepress-types
      // const $site = this.$site || window.$site || { pages: [ {
      //   frontmatter: { type: undefined, published: undefined },
      //     path: undefined, date: undefined, lastUpdated: undefined
      // } ] };
      return this.$site.pages
                       .filter(page => page.frontmatter.type === 'post')
                       .filter(post => post.path.endsWith('.html'))
                       // .filter(page => { console.log(page); return page; }) // debug logging...
                       // .filter(html => html.frontmatter.published) // uncomment if you would like to void drafts
                       .sort((p1, p2) => !p1.date || !p2.date // if no date fields provided by frontmatter, then compare git
                             ? (p1.lastUpdated || 1) - (p2.lastUpdated || 0) // commit time, otherwise compare posts dates
                             : new Date(p1.date).getTime() - new Date(p2.date).getTime());
    },
  },
};
</script>
