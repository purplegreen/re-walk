<template>
  <div id="app">
    <nav-bar />
    <nuxt />
  </div>
</template>
<script>
import NavBar from '~/components/NavBar.vue'
export default {
  components: {
    NavBar,
  },
  head: {
    titleTemplate: '%s - Guided Walk', // <-- title template
    meta: [
      {
        hid: 'description',
        name: 'description', // <-- moved this over from index.vue
        content: 'customize your walk meditation',
      },
    ],
  },
}
</script>

<style lang="scss">
@import '../style/index';
</style>
