<template>
  <div>
    <h2>Привет</h2>
    <p>Это моя офигительная Vue-компонента!</p>

    <div>$site</div>
    <pre style="background-color: transparent">
      {{ $site }}
    </pre>

    <div>$page</div>
    <pre style="background-color: transparent">
      {{ $page }}
    </pre>

    <div>$lang</div>
    <pre style="background-color: transparent">
      {{ $lang }}
    </pre>

    <div>$localePath</div>
    <pre style="background-color: transparent">
      {{ $localePath }}
    </pre>

    <!--<div>$title</div>
    <pre style="background-color: transparent">
      {{ $title }}
    </pre>

    <div>$description</div>
    <pre style="background-color: transparent">
      {{ $description }}
    </pre>-->
  </div>
</template>
<script>
  export default {
    name: 'MyDebug',
  }
</script>
