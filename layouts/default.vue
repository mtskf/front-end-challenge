<template lang="pug">
  div
    app-header
    main
      nuxt
</template>

<script>
  import AppHeader from '@/components/AppHeader'
  export default {
    components: { AppHeader }
  }
</script>

<style lang="scss">
  body {
    font-family: 'Source Sans Pro', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    font-size: 16px;
    line-height: 1.5;
  }
  main {
    max-width: 960px;
    margin: 32px auto;
    padding: 0 24px;
  }
  a {
    color: deepskyblue;
    text-decoration: none;
  }
  article {
    margin: 0 auto;
    max-width: 650px;
  }
</style>
