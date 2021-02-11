<template>
  <div>
    <h2>Привет</h2>
    <p>Это дебаг Vue-компонента!</p>
    <p>Используй ее прямо в .md файлах...</p>

    <span v-if="show$this">
      <div>$this</div>
      <pre style="background-color: transparent">
        {{ this }}
      </pre>
    </span>

    <span v-if="show$site">
      <div>$site</div>
      <pre style="background-color: transparent">
        {{ $site }}
      </pre>
    </span>

    <span v-if="show$page">
      <div>$page</div>
      <pre style="background-color: transparent">
        {{ $page }}
      </pre>
    </span>

    <span v-if="show$lang">
      <div>$lang</div>
      <pre style="background-color: transparent">
        {{ $lang }}
      </pre>
    </span>

    <span v-if="show$localePath">
      <div>$localePath</div>
      <pre style="background-color: transparent">
        {{ $localePath }}
      </pre>
    </span>

    <span v-if="show$title">
      <!--<div>$title</div>
      <pre style="background-color: transparent">
        {{ $title }}
      </pre>-->
    </span>


    <span v-if="show$description">
      <!--<div>$description</div>
      <pre style="background-color: transparent">
        {{ $description }}
      </pre>-->
    </span>
  </div>
</template>
<script>
  export default {
    name: 'MyDebug',
    props: {
      show$this: {
        type: Boolean,
        required: false,
        default: true,
      },
      show$site: {
        type: Boolean,
        required: false,
        default: false,
      },
      show$page: {
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
        default: false,
      },
      show$description: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
  };
</script>
