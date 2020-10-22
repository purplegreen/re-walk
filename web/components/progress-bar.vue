<template>
  <div class="progress">
    <span
      v-for="(snippet, index) in snippets"
      :key="snippet._id"
      class="progress-bar"
      :class="{ highlight: snippet.isHighlighted }"
      :style="getProgressBarStyle(snippet)"
      @click.self="onClick(snippet, index, $event)"
    >
      <div class="cont-wrap">
        <span class="num">{{ snippet.duration | secondsToMinutes }}</span>
        <span class="min">min</span>
        <span class="rotate-text"
          ><h4>{{ snippet.title }}</h4></span
        >
      </div>
      <span
        class="progress-overlay"
        :style="getProgressOverlayStyle(snippet)"
      ></span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    snippets: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    max() {
      return this.snippets.reduce((total, snippet) => {
        return total + snippet.duration
      }, 0)
    },
  },
  methods: {
    getProgressBarStyle(snippet) {
      return {
        backgroundColor: snippet.color,
        width: `${(snippet.duration * 100) / this.max}%`,
      }
    },
    getProgressOverlayStyle(snippet) {
      if (snippet.isHighlighted) return { width: '100%' }
      return {
        width: `${(snippet.alreadyPlayedInSeconds * 100) / snippet.duration}%`,
      }
    },
    onClick(snippet, index, $event) {
      this.$emit('onBarClicked', snippet, index, $event)
    },
  },
}
</script>

<style lang="scss" scoped>
.cont-wrap {
  height: 90%;
  width: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 15% 15% 70%;
  pointer-events: none;
  border-right: 1px solid var(--wverdefluoa);
}
.num {
  grid-column: 1;
  grid-row: 1;
  font-size: 0.5rem;
  font-weight: bold;
}
.min {
  grid-column: 1;
  grid-row: 2;
  pointer-events: none;
  font-size: 0.5rem;
  z-index: 1;
}
.rotate-text {
  pointer-events: none;
  font-size: 0.5rem;
  z-index: 1;
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
  grid-column: 1;
  grid-row: 3;
  margin: auto;
  text-align: left;
}
.progress {
  position: relative;
  cursor: pointer;
  display: flex;
  overflow: hidden;
  font-size: 0.8rem;
  -webkit-box-shadow: 0px 6px 9px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 6px 9px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  border-radius: var(--border-radius);
  background-color: var(--wblue);
  opacity: 0.7;
  height: 27vh;
  width: 99%;
  margin: auto;
  margin-top: 10px;
}

.progress-overlay {
  position: absolute;
  pointer-events: none;
  background-color: var(--wpink);
  // opacity: 0.9;
  top: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
}
.progress-bar {
  position: relative;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  // justify-content: center;
  color: white;
  // text-align: center;
  white-space: wrap;
  background-color: var(--wblue);
  transition: all 0.6s ease;
  &.highlight {
    font-weight: bold;
    font-size: 1.2em;
  }
}
</style>
