<template>
  <div>
    <h1>My categories</h1>
    <pre style="background-color: transparent">{{ tags }}</pre>
    <p>
      try these links: <br/>
      http://localhost:8080/categories/?q=ololo <br/>
      http://localhost:8080/categories/?q=ololo&q=trololo <br/>
      <br/>and see results:
    </p>
    <h2>?q=...</h2>
    <pre style="background-color: transparent">{{ query }}</pre>
    <pre style="background-color: transparent">!!query.q && query.q && Array.isArray(query.q): {{ !!query.q && query.q && Array.isArray(query.q) }}</pre>
  </div>
</template>

<script>
export default {
  name: 'MyCategories',
  computed: {
    query() {
      // return this.$router.options.routes.flatMap(({ name, path }, index, array) => ({ [name]: path }));
      return this.$route.query;
    },
    tags() {
      return this.$site.pages
                       .filter(page => !!page.path)
                       // .filter(page => page.path.endsWith('.html'))
                       .filter(htmlPage => !!htmlPage.frontmatter)
                       .map(htmlPage => htmlPage.frontmatter)
                       .filter(frontmatter => !!frontmatter.categories || !!frontmatter.tag)
                       .flatMap(frontmatter => !!frontmatter.categories ? frontmatter.categories : [frontmatter.category])
                       .filter((category, index, categories) => categories.indexOf(category) === index);
    },
  },
};
</script>
