<template>
  <div class="duration">
    <template v-if="withRemaining"
      >{{ passed | secondsToMinutes }}min of</template
    >
    {{ total | secondsToMinutes }}min
  </div>
</template>

<script>
export default {
  name: 'Duration',
  props: {
    total: {
      type: Number,
      default: 0,
    },
    passed: {
      type: Number,
      default: 0,
    },
    withRemaining: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.duration {
  color: white;
  font-size: 0.8rem;
  display: inline-block;
  position: relative;
  background-color: var(--wblue);
  background-size: contain;
  padding: 6px;
  margin: 7px 2px;
  border-radius: var(--border-radius);
}
</style>
