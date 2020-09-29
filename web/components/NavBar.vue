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

<style lang="scss" scoped>
.brand {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.5em;
  color: #39b982;
  text-decoration: none;
}

#nav-modal {
  background-color: lightgray;

  div.v--modal-box {
    position: relative;
    border-radius: var(--border-radius);
    max-width: 414px;
    width: 10vw;
    height: 96vh;
    padding: 20px;
    background-color: indianred;
  }

  div.vm--modal {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    background-color: yellow;
    border-radius: var(--border-radius);
    box-shadow: 0 20px 60px -2px rgba(27, 33, 58, 0.4);
  }

  div.v--modal-overlay .v--modal-box {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    background-color: hotpink;
  }
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
  color: #39b982;
  border-bottom: solid 2px #39b982;
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
