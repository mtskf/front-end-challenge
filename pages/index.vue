<template lang="pug">
  .row
    .col
      h2 Input string
      input(type="text", v-model="inputString", @blur="setData(inputString)")
      file-upload(@setData="setData")
    .col
      dijkstra(:inputString="data")
  </template>

<script>
  import FileUpload from '@/components/FileUpload'
  import Dijkstra from '@/components/Dijkstra'

  export default {
    name: 'HomePage',
    components: { FileUpload, Dijkstra },
    data () {
      return {
        title: `${process.env.title}`,
        // description: 'Blog starter template with WP Rest-API and Nuxt.js',
        inputString: 'Graph: AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7',
        data: 'Graph: AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7'
      }
    },
    head () {
      return {
        title: this.title,
        meta: [
          { property: 'og:title', content: this.title }
          // { hid: 'description', name: 'description', content: this.description },

          // // Twitter Card
          { name: 'twitter:card', content: 'summary' },
          // { name: 'twitter:title', content: this.title },
          // { name: 'twitter:description', content: this.description },
          // { name: 'twitter:image', content: `${process.env.baseUrl}/asset/....jpg` },
          //
          // // Open Graph
          { property: 'og:title', content: this.title },
          // { property: 'og:description', content: this.description },
          // { property: 'og:url', content: process.env.baseUrl + this.$route.path },
          // { property: 'og:image', content: `${process.env.baseUrl}/asset/....jpg` }
        ]
      }
    },
    watch: {
      inputString (val) {
        setTimeout(() => {
          this.setData(this.inputString)
        }, 2000)
      }
    },
    methods: {
      setData (data) {
        this.inputString = data.trim()
        this.data = data.trim()
      }
    },
    scrollToTop: true
  }
</script>


<style scoped lang="scss">
  .row {
    position: relative;
    display: flex;
    justify-content: stretch;
    align-items: stretch;
    margin: 0 -16px;
  }
  .col {
    position: relative;
    width: 50%;
    margin: 0 16px;
  }
  input {
    width: 100%;
    box-sizing: border-box;
    font-size: 16px;
    padding: 4px;
  }
</style>
