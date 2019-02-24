<template>
  <div>
    <h3 class="post-view-heading">
      <router-link :to="path">{{ title }}</router-link>
    </h3>
    <p>
      {{ description }} <router-link :to="path">→ Читать</router-link>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'MyPostPreview',
    props: {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
    },
  };
</script>

<style lang="stylus">
  .post-view-heading
    text-align center
</style>
