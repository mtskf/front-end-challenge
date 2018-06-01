<template lang="pug">
  .drop(@dragleave.prevent, @dragover.prevent, @drop.prevent="onDrop")
    .drop__container
      label Drop Input File Here!
        small (Text file only)
        input.drop__input(type="file", @change="onDrop")
</template>

<script>
  export default {
    name: 'FileUpload',
    methods: {
      onDrop (event) {
        let fileList = event.target.files ? event.target.files : event.dataTransfer.files
        let file = fileList[0]
        const reader = new FileReader()

        if (file.type.indexOf('text') === 0) {
          reader.onload = e => {
            console.log('yo:', reader.result)
            this.$emit('setData', reader.result)
          }
          reader.readAsText(file)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .drop {
    margin-top: 20px;
    position: relative;
    height: 200px;
    border: 3px dashed #ccc;
    background-color: #eee;
  }
  .drop__container {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 24px;
    color: #aaa;
  }
  label { display: block; }
  input {
    display: block;
    visibility: hidden;
    height: 0;
  }
  small {
    display: block;
  }
</style>
