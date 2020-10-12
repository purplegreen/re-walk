/* eslint-disable vue/require-default-prop */ /* eslint-disable
vue/require-default-prop */
<template>
  <svg class="icon icon-colors">
    <use v-bind="{ 'xlink:href': 'icons-collection.svg#' + name }" />
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    name: String,
  },
}
</script>

<style lang="scss" scoped>
.icon {
  width: 50px;
  height: 50px;
}

.icon-colors {
  --color-i: var(--wovermidnight);
}

.icon-colors:hover {
  --color-i: #949494;
}
</style>
