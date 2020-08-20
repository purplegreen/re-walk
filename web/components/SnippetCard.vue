/* eslint-disable vue/require-prop-types */ /* eslint-disable
vue/require-prop-types */
<template>
  <div class>
    <div class="wrap-title">
      <h1 class="with-padding">
        Create your Custom Walk by adding Meditations to your Composition
      </h1>
    </div>
    <progress-bar :snippets="customWalkpath.composition"></progress-bar>
    <duration :total="customWalkpath.duration"></duration>
    <div>
      <button :disabled="!isWalkpathReady" @click="start">
        <BaseIcon alt="Start Walk" name="next" />
      </button>
    </div>
    <div class="snippets">
      <button
        v-for="snippet of snippets"
        :key="snippet.id"
        class="snippet"
        :class="{ selected: issnippetSelected(snippet) }"
        :style="issnippetSelectedColor(snippet)"
        @click="showModal(snippet)"
      >
        <h6 class="centered">{{ snippet.name }}</h6>
      </button>
      <modal
        name="snippet-modal"
        transition="nice-modal-fade"
        :adaptive="true"
        @before-open="beforeOpen"
      >
        <div class="snippet-modal-content">
          <div class="side-el">
            <button @click="$modal.hide('snippet-modal')">
              <BaseIcon alt="Close snippet" name="close" />
            </button>
          </div>
          <ul>
            <li>
              <h2 class="with-padding">{{ selectedsnippet.name }}</h2>
            </li>
            <li>
              <h3>{{ selectedsnippet.category }}</h3>
            </li>
            <li>
              <h3 class="with-padding-10">
                {{ selectedsnippet.duration | secondsToMinutes }} min
              </h3>
            </li>
            <li>
              <h4 class="with-padding">{{ selectedsnippet.shortText }}</h4>
            </li>
          </ul>
          <div class="wrap-buttons">
            <button v-if="issnippetSelected(selectedsnippet)" @click="remove">
              <BaseIcon alt="Remove snippet" name="remove" />
            </button>
            <button v-else @click="add">
              <BaseIcon alt="Insert snippet" name="insert" />
            </button>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ProgressBar from '@/components/progress-bar.vue'
import Duration from '@/components/duration.vue'

export default {
  name: 'SnippetCard',
  components: {
    ProgressBar,
    Duration,
  },
  props: {
    name: {
      type: Object,
      required: true,
    },
    /* eslint-disable */

    data() {
      return {
        loading: false,
        blocks: [],
        text: '',
      }
    },
    // eslint-disable-next-line vue/require-prop-types
    computed: {
      ...mapState({
        snippets: (state) => state.snippet.snippets,
        customWalkpath: (state) => state.walkpath.customWalkpath,
      }),
      isWalkpathReady() {
        return this.customWalkpath.composition.length > 0
      },
    },

    methods: {
      ...mapActions([
        'addToWalkpath',
        'removeFromWalkpath',
        'setWalkpathInProgress',
      ]),
      showModal(snippet) {
        this.$modal.show('snippet-modal', { snippet })
      },
      beforeOpen({ params }) {
        this.selectedsnippet = params.snippet
      },
      add() {
        this.addToWalkpath(this.selectedsnippet)
        this.$modal.hide('snippet-modal')
      },
      remove() {
        this.removeFromWalkpath(this.selectedsnippet)
        this.$modal.hide('snippet-modal')
      },
      start() {
        this.setWalkpathInProgress(this.customWalkpath)
        this.$router.push('walkpath')
      },
      issnippetSelected(snippet) {
        const index = this.customWalkpath.composition.findIndex(
          (e) => e.id === snippet.id
        )
        return index !== -1
      },
      issnippetSelectedColor(snippet) {
        return {
          backgroundColor: snippet.color,
        }
      },
    },
  },
}
</script>

<style scoped>
.snippets {
  padding-top: 12px;
  padding-bottom: 40px;
}
.snippet {
  width: 22%;
  color: white;
  border-radius: var(--border-radius);
  -webkit-box-shadow: 0px 6px 9px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 6px 9px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  padding: 19px 0px;
  margin: 3px;
}
.snippet.selected {
  background: #add8e6;
}
.snippet-modal-content {
  padding: 10px;
}
.wrap-title {
  width: 90%;
  margin: auto;
}
</style>

<style lang="scss">
.v--modal {
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 20px 60px -2px rgba(27, 33, 58, 0.4);
  padding: 0;
}
.v--modal-box {
  border-radius: var(--border-radius);
  max-width: 414px;
  width: 96vw;
  height: 96vh;
  padding: 20px;
}
.v--modal-overlay .v--modal-box {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}
.centered {
  text-align: center;
  margin: auto;
}
.with-padding {
  padding-bottom: 20px;
}
.with-padding-10 {
  padding-bottom: 10px;
}
.with-margin {
  margin-bottom: 30px;
}
.wrap-buttons {
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
}
.t-icon {
  width: 50px;
  height: auto;
}
.side-el {
  position: absolute;
  width: 38px;
  height: 38px;
  right: 18px;
  top: 10px;
  width: 3rem;
  height: auto;
}
</style>
