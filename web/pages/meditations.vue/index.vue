<template>
  <client-only placeholder="Loading...">
    <div class>
      <div class="wrap-title">
        <h1 class="with-padding">
          Create your Custom Walk by adding Meditations
        </h1>
      </div>
      <progress-bar :snippets="customWalkpath.composition"></progress-bar>
      <duration :total="customWalkpath.duration"></duration>

      <div>
        <button
          :disabled="!isWalkpathReady"
          class="modal-button"
          @click="start"
        >
          <BaseIcon alt="Start Walk" name="next" />
        </button>
      </div>

      <div class="snippet">
        <button
          v-for="snippet of snippets"
          ref="snippet"
          :key="snippet._id"
          :style="isSnippetSelectedColor(snippet)"
          class="snippet"
          :class="{ selected: isSnippetSelected(snippet) }"
          @click="showModal(snippet)"
        >
          <h3>{{ snippet.title }}</h3>
        </button>
        <!-- MODAL OPENING -->
        <modal
          name="snippet-modal"
          transition="nice-modal-fade"
          :adaptive="true"
          @before-open="beforeOpen"
        >
          <div class="snippet-modal-content">
            <div class="side-el">
              <button
                class="modal-button"
                @click="$modal.hide('snippet-modal')"
              >
                <BaseIcon alt="Close snippet" name="close" />
              </button>
            </div>
            <ul>
              <li>
                <h3 class="with-padding">
                  {{ selectedSnippet.title }}
                </h3>
              </li>
              <li>
                <h3 class="with-padding-10">
                  {{ selectedSnippet.duration }} min
                </h3>
              </li>
            </ul>
            <div class="wrap-buttons">
              <button
                v-if="isSnippetSelected(selectedSnippet)"
                class="modal-button"
                @click="remove"
              >
                <BaseIcon alt="Remove snippet" name="remove" />
              </button>
              <button v-else class="modal-button" @click="add">
                <BaseIcon alt="Insert snippet" name="insert" />
              </button>
            </div>
          </div>
        </modal>
        <!-- MODAL CLOSING -->
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapState } from 'vuex'
import ProgressBar from '@/components/progress-bar.vue'
import Duration from '@/components/duration.vue'

export default {
  name: 'Snippets',
  components: {
    ProgressBar,
    Duration,
  },
  async fetch({ store }) {
    await store.dispatch('snippets/fetchSnippets')
  },
  data() {
    return {
      selectedSnippet: {},
    }
  },
  computed: {
    ...mapState({
      snippets: (state) => state.snippets.all,
      customWalkpath: (state) => state.walkpath.customWalkpath,
      // selectedSnippet: (state) => state.snippets.selectedSnippet,
    }),
    isWalkpathReady() {
      return this.customWalkpath.composition.length > 0
    },
  },
  methods: {
    // ...mapActions([
    //   'addToWalkpath',
    //   'removeFromWalkpath',
    //   'setWalkpathInProgress',
    // ]),
    showModal(snippet) {
      // this.$store.dispatch('walkpath/setSelectedSnippet', snippet)
      this.$modal.show('snippet-modal', { snippet })
    },
    beforeOpen({ params }) {
      this.selectedSnippet = params.snippet
    },
    add() {
      // this.addToWalkpath(this.selectedSnippet)
      this.$store.dispatch('walkpath/addToWalkpath', this.selectedSnippet)
      this.$modal.hide('snippet-modal')
    },
    remove() {
      this.$store.dispatch('walkpath/removeFromWalkpath', this.selectedSnippet)
      this.$modal.hide('snippet-modal')
    },
    start() {
      this.setWalkpathInProgress(this.customWalkpath)
      this.$router.push('walkpath')
    },
    isSnippetSelected(snippet) {
      const index = this.customWalkpath.composition.findIndex(
        (e) => e._id === snippet._id
      )
      return index !== -1
    },
    isSnippetSelectedColor(snippet) {
      return {
        backgroundColor: snippet.color,
      }
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
  color: darkgrey;
  border-radius: 12px;
  border: 1px solid transparent;
  -webkit-box-shadow: 0px 6px 9px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 6px 9px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
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

.modal-button {
  border: 0;
  background-color: transparent;
}
</style>

<style lang="scss">
.center {
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
