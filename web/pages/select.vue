<template>
  <div>
    <a
      v-for="walkpath in walkpaths"
      :key="walkpath.id"
      class="walkpath card"
      @click="select(walkpath)"
    >
      <div>
        {{ walkpath.name }}
      </div>
    </a>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'SelectWalkpath',
  computed: {
    ...mapState({
      walkpaths: (state) => state.walkpath.walkpaths,
    }),
  },
  methods: {
    ...mapActions(['setWalkpathInProgress']),
    select(walkpath) {
      this.setWalkpathInProgress(walkpath)
      this.$router.push('walkpath')
    },
  },
}
</script>

<style lang="scss" scoped>
.walkpath {
  cursor: pointer;
  margin-bottom: 1em;
  display: block;
}
</style>
