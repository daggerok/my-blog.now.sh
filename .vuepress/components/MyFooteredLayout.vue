<template>
  <div>
    <div class="content-wrapping-section">
      <ParentLayout/>
    </div>
    <div class="home">
      <MyFooter/>
    </div>
  </div>
</template>

<script>
  import ParentLayout from 'vuepress-theme-default-prefers-color-scheme/layouts/Layout.vue';
  import MyFooter from '@/components/MyFooter.vue'

  export default {
    name: 'MyFooteredLayout',
    components: {
      ParentLayout,
      MyFooter,
    },
  };
</script>

<style lang="stylus">
  html, body
    margin 0
    height 100%
  .content-wrapping-section
    min-height calc(100vh - 30vh)
  .home.footer
    height 30vh
</style>
