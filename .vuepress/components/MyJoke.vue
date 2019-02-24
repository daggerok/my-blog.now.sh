<template>
  <div>
    <h1 class="centred-text">{{ value }} 😄 </h1>
  </div>
</template>

<script>
  export default {
    name: 'MyJoke',
    props: {
      value: {
        type: String,
        required: true,
      },
    },
  };
</script>

<style lang="stylus">
  .centred-text
    text-align center
    border none
</style>
