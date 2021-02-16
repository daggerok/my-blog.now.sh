<!--
<template>
  <div class="home hero">
    <br>
    <footer class="footer">
      <div>
        Хрен его знает с правами... наверное они все защищены и все такое,
        нo использование материалов, фотографий и прочего на этом сайте,
        разрешается лишь после подтверждения
        <br/>
        <br/>
        MIT | Copyright © 2019
        <br/>
        <br/>
        Максим Костромин он же <a href="https://github.com/daggerok">daggerok</a>
      </div>
    </footer>
  </div>
</template>
-->

<!--
<template>
  <footer class="footer">
    <div>
      Хрен его знает с правами... наверное они все защищены и все такое,
      нo использование материалов, фотографий и прочего на этом сайте,
      разрешается лишь после подтверждения
      <br/>
      <br/>
      MIT | Copyright © 2019
      <br/>
      <br/>
      Максим Костромин он же <a href="https://github.com/daggerok">daggerok</a>
    </div>
    &lt;!&ndash;<h1>🐻</h1>&ndash;&gt;
  </footer>
</template>
-->

<template>
  <footer class="footer">
    <div>

      <span v-if="!!footerMessage" v-html="footerMessage"></span>
      <br/>
      <br/>
      <br/>
      Copyright © 2019 <strong>MIT</strong> | <a href="https://about.me/daggerok">Максим Костромин</a>
    </div>
    <!--<h1>🐻</h1>-->
  </footer>
</template>

<script>
  export default {
    name: 'MyFooter',
    data() {
      return { footerMessage: undefined }
    },
    created() {
      const { footer } = require('@/services/messages');
      this.footerMessage = footer;
    },
  };
</script>
