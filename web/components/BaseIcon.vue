<template>
  <svg class="icon icon-colors">
    <use v-bind="{ 'xlink:href': '/icons-collection.svg#' + name }" />
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.icon {
  width: 50px;
  height: 50px;
  cursor: pointer;
}

.icon-colors {
  --color-i: var(--wdarkpink);
}

.icon-colors:hover {
  --color-i: var(--wmidnight);
}
</style>
