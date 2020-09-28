<template>
  <div class="nav">
    <nuxt-link to="/" class="brand"
      ><img
        alt="Guided Meditation Walk"
        class="logo"
        src="..//assets/guidedWalklogo.svg"
    /></nuxt-link>

    <button @click="showModal">X</button>

    <modal :adaptive="true" name="navModal">
      <nav>
        <nuxt-link to="/">List</nuxt-link>&nbsp;|
        <nuxt-link to="/meditations">Meditations</nuxt-link> |
        <nuxt-link to="/about">About</nuxt-link> |
        <nuxt-link to="/more">More</nuxt-link>
      </nav>
    </modal>
  </div>
</template>
<script>
export default {
  name: 'NavModal',
  methods: {
    showModal(navModal) {
      this.$modal.show('navModal')
    },
  },
}
</script>

<style scoped>
.brand {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.5em;
  color: #39b982;
  text-decoration: none;
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
.nav .nav-item {
  box-sizing: border-box;
  margin: 0 5px;
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
}
.nav .nav-item.router-link-exact-active {
  color: #39b982;
  border-bottom: solid 2px #39b982;
}
.nav a {
  display: inline-block;
}
</style>
