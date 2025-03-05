<template>
  <div>
    <h1>Blog</h1>
    <div v-for="article in articles.data" :key="article.id">
      <h2>{{ article.title }}</h2>
      <p>{{ article.description }}</p>
    </div>
  </div>
</template>

<script setup>
const { data: articles } = await useFetch('http://localhost:1337/api/articles');
</script>

<style scoped>

</style>