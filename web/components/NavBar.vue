<template>
  <div class="nav">
    <nuxt-link to="/" class="brand"
      ><img
        alt="Guided Meditation Walk"
        class="logo"
        src="..//assets/guidedWalklogo.svg"
    /></nuxt-link>

    <NuxtLink class="lateral-nav-ico nav-ico" nuxt-link to="/about">
      <BaseIcon id="lat-nav" alt="lateral nav" name="lat-nav" />
    </NuxtLink>
  </div>
</template>
<script>
export default {
  name: 'NavModal',
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 414px;
  height: 50px;
  border: 1px solid var(--border-color);
  background-color: whitesmoke;
  opacity: 0.9;
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  z-index: 900;
}
.logo {
  margin-top: 5px;
  width: 60px;
  height: 60px;
  cursor: pointer;
  padding-left: 14px;
}

// #lat-nav.icon {
//   --color-i: var(--wdarkpink);
// }

.icon {
  &.icon {
    margin-top: 5px;
    width: 60px;
    height: 60px;
    cursor: pointer;
    padding-right: 14px;
    --color-i: var(--wdarkpink);
  }
}

@media screen and (min-device-width: 300px) and (max-device-width: 540px) {
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
}
</style>
