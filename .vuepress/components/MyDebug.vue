<template>
  <div>
    <h2>дебаг компонента</h2>
    <br/>

    <span v-if="!!show$site && !!$site">
      <hr/>
      <div>$site</div>
      <pre class="code-block">{{ $site }}</pre>
    </span>

    <span v-if="!!show$page && !!$page">
      <hr/>
      <div>$page</div>
      <pre class="code-block">{{ $page }}</pre>
    </span>

    <span v-if="!!show$frontmatter && !!$frontmatter">
      <hr/>
      <div>$frontmatter</div>
      <pre class="code-block">{{ $frontmatter }}</pre>
    </span>

    <span v-if="!!show$lang && !!$lang">
      <hr/>
      <div>$lang</div>
      <pre class="code-block">{{ $lang }}</pre>
    </span>

    <span v-if="!!show$localePath && !!$localePath">
      <hr/>
      <div>$localePath</div>
      <pre class="code-block">{{ $localePath }}</pre>
    </span>

    <span v-if="!!show$title && !!$title">
      <hr/>
      <div>$title</div>
      <pre class="code-block">{{ $title }}</pre>
    </span>

    <span v-if="!!show$description && !!$description">
      <hr/>
      <div>$description</div>
      <pre class="code-block">{{ $description }}</pre>
    </span>

    <span v-if="!!show$themeConfig && !!$themeConfig">
      <hr/>
      <div>$themeConfig</div>
      <pre class="code-block">{{ $themeConfig }}</pre>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'MyDebug',
    props: {
      show$site: {
        type: Boolean,
        required: false,
        default: true,
      },
      show$page: {
        type: Boolean,
        required: false,
        default: true,
      },
      show$frontmatter: {
        type: Boolean,
        required: false,
        default: true,
      },
      show$lang: {
        type: Boolean,
        required: false,
        default: true,
      },
      show$localePath: {
        type: Boolean,
        required: false,
        default: true,
      },
      show$title: {
        type: Boolean,
        required: false,
        default: true,
      },
      show$description: {
        type: Boolean,
        required: false,
        default: true,
      },
      show$themeConfig: {
        type: Boolean,
        required: false,
        default: true,
      },
    },
  };
</script>

<style lang="stylus">
  pre.code-block
    background-color transparent
</style>
