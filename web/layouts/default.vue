<template>
  <div id="back">
    <div id="app">
      <nav-bar />
      <nuxt />
    </div>
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
        hid: 'Guided Walk',
        name: 'meditationsreise', // <-- moved this over from index.vue
        content:
          'Take your Time. A multi-path walk for observations on ecology and vulnerability',
      },
    ],
  },
}
</script>

<style lang="scss">
@import '../style/index';
</style>
