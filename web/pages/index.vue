<script>
export default {
  name: 'Home',
  created() {
    setTimeout(() => this.$router.push({ path: '/meditations' }), 860)
  },
}
</script>

<template>
  <div class="wrapper">
    <img
      alt="Guided Meditation Walk"
      class="guidedwalk-logo"
      src="../assets/guidedwalk.svg"
    />
  </div>
</template>

<style lang="css" scoped>
.wrapper {
  padding: 1em;
}

.guidedwalk-logo {
  width: 80vw;
  margin: auto;
  padding-top: 20vh;
}

.card {
  margin-bottom: 1em;
}
</style>
