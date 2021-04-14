<template>
  <footer class="footer">
    <div>

      <span v-if="!!footerMessage" v-html="footerMessage"></span>
      <br/>
      <br/>
      <br/>
      Copyright © 2019-present <strong>MIT</strong> | <a href="https://about.me/daggerok">Максим Костромин</a>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'MyFooter',
    data() {
      return { footerMessage: undefined }
    },
    created() {
      const { footer } = require('@/my-services/messages');
      this.footerMessage = footer;
    },
  };
</script>
