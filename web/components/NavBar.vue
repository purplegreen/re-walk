<template>
  <div class="nav">
    <nuxt-link to="/" class="brand"
      ><img
        alt="Guided Meditation Walk"
        class="logo"
        src="..//assets/guidedWalklogo.svg"
    /></nuxt-link>

    <button class="lateral-nav-ico" @click="showModal">
      <BaseIcon alt="lateral nav" name="lat-nav" />
    </button>

    <modal
      id="nav-modal"
      name="navModal"
      transition="nice-modal-fade"
      :adaptive="true"
    >
      <nav>
        <nuxt-link to="/"><h4>eingeben</h4></nuxt-link>
        <nuxt-link to="/meditations"><h4>meditationen</h4></nuxt-link>
        <nuxt-link to="/about"><h4>über</h4></nuxt-link>
        <nuxt-link to="/more"><h4>mehr</h4></nuxt-link>
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

<style lang="scss" scoped>
.logo {
  padding-left: 20px;
  padding-top: 40px;
  width: 70px;
  height: auto;
}

.brand {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.5em;
  text-decoration: none;
}

nav {
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 260px;
  border-radius: var(--border-radius);
  border: 2px solid black;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

nav a:hover {
  color: black;
  text-decoration: underline;
  text-decoration-thickness: from-font;
  cursor: pointer;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  border: 1px solid var(--border-color);
  background-color: whitesmoke;
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
}

.nav .nav-item {
  box-sizing: border-box;
  margin: 0 5px;
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
}
.nav .nav-item.router-link-exact-active {
  color: goldenrod;
  border-bottom: solid 2px goldenrod;
}
.nav a {
  display: inline-block;
}

.lateral-nav-ico {
  width: 30px;
  height: auto;
  margin-right: 20px;
}
</style>
