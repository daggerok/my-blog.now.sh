<template>
  <div>
    <div v-for="post in posts">
      <MyPostPreview :title="post.frontmatter.title || 'title is undefined'"
                     :description="post.frontmatter.description || 'description is undefined'"
                     :path="post.path || '/'"
      />
    </div>
    <!--<MyHomeHeroFooter/>-->
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
      const tagQuery = this.$route.query["tags"] || [];
      const query = typeof tagQuery !== 'string' && Array.isArray(tagQuery) ? [...tagQuery] : [tagQuery];
      function tagIfPresent(post) {
        if (query.length < 1) return true;

        const tag = post.frontmatter.tag;
        if (!!tag && tag.trim().length > 0)
          return query.filter(t => tag.includes(t)).length > 0;

        const tags = post.frontmatter.tags;
        if (!tags || !Array.isArray(tags) || tags.length < 1) return true;

        return tags.filter(t => !!t)
                   .map(t => t.toLowerCase())
                   .filter(t => query.filter(q => !!q)
                                     .map(q => q.toLowerCase())
                                     .filter(q => t.includes(q))
                                     .length > 0)
                   .length > 0;
      }
      return this.$site.pages
                       .filter(page => page.frontmatter.type === 'post')
                       .filter(post => post.path.endsWith('.html'))
                       .filter(tagIfPresent)
                       // .filter(page => { console.log(page); return page; }) // debug logging...
                       // .filter(html => html.frontmatter.published) // uncomment if you would like to void drafts
                       .sort((p1, p2) => !p1.date || !p2.date // if no date fields provided by frontmatter, then compare git
                             ? (p1.lastUpdated || 1) - (p2.lastUpdated || 0) // commit time, otherwise compare posts dates
                             : new Date(p1.date).getTime() - new Date(p2.date).getTime());
    },
  },
};
</script>
