<template>
  <div class="features"
       v-if="data.features && data.features.length">

    <div class="feature"
         v-for="(feature, index) in data.features"
         :key="index">

      <h2>{{ feature.title }}</h2>
      <p>{{ feature.details }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MyFeature',
    computed: {
      data () {
        return this.$page.frontmatter
      },
    }
  };
</script>
