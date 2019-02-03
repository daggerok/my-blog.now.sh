<template>
  <div>
    <h2>
      <router-link :to="path">{{ title }}</router-link>
    </h2>
    <p>{{ description }}</p>
    <p>
      <router-link :to="path">Читать →</router-link>
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
