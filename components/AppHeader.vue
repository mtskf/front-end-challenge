<template lang="pug">
  header
    h1 Front-end Challenge
    a(href="https://public.3.basecamp.com/p/UGtVqUhwNxcvR47f3dtHZPmf") Challenge Detail
    p Mitsuki Fukunaga
</template>

<script>
  export default {
    name: 'AppHeader'
  }
</script>

<style scoped lang="scss">
  header {
    padding: 24px 32px;
    margin-bottom: 32px;
    text-align: center;
  }
  h1 {
    font-weight: 100;
  }
  nav {
    max-width: 650px;
    margin: 0 auto;
  }
  .link {
    font-size: 18px;
    margin-right: 16px;
  }
  .nuxt-link-active {
    font-weight: bold;
    text-decoration: underline;
  }
</style>
