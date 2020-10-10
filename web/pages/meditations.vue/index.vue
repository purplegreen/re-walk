<template>
  <client-only placeholder="Loading...">
    <div class>
      <!-- TITLE -->
      <div class="wrap-title">
        <h1 class="with-padding">
          Wähle Meditationen für deinen Weg
        </h1>
      </div>
      <!-- SNIPPETS BOARD -->
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
          <h5 class="snippet-title">{{ snippet.title }}</h5>
        </button>
        <!-- MODAL OPENING -->
        <transition name="slide-fade">
          <modal
            id="snippet-modal"
            name="snippet-modal"
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
                    {{ selectedSnippet.duration | secondsToMinutes }} min
                  </h3>
                </li>
                <li>
                  <SanityContent :blocks="selectedSnippet.shortText" />
                </li>
                <li>
                  <SanityImage
                    v-if="selectedSnippet.mainImage"
                    project-id="0hyezyzt"
                    auto="format"
                    :asset-id="selectedSnippet.mainImage.asset._ref"
                  />
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
        </transition>
        <!-- MODAL CLOSING -->
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
    </div>
  </client-only>
</template>

<script>
import { mapState } from 'vuex'
import ProgressBar from '@/components/progress-bar.vue'
import Duration from '@/components/duration.vue'
import { SanityImage } from '@nuxtjs/sanity/dist/sanity-image'

export default {
  name: 'Snippets',
  components: {
    ProgressBar,
    Duration,
    SanityImage,
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
      this.$store.dispatch(
        'walkpath/setWalkpathInProgress',
        this.customWalkpath
      )
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
.slide-fade-enter-active {
  transition: all 0.7s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(50px);
  opacity: 0;
}

.snippets {
  padding-top: 12px;
  padding-bottom: 40px;
}
.snippet {
  border-radius: var(--border-radius);
  border: 1px solid transparent;
  -webkit-box-shadow: 0px 6px 9px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 6px 9px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  margin: 3px;
  background-color: #ffc701;
}

.snippet:hover {
  background-color: #e0b20e;
}
.snippet.selected {
  background: #5552ff;
}
.snippet-modal-content {
  padding: 10px;
}
.wrap-title {
  padding-top: 50px;
  padding-bottom: 50px;
  width: 90%;
  margin: auto;
}

.modal-button {
  border: 0;
  background-color: transparent;
}
</style>

<style lang="scss">
.snippet-title {
  color: white;
  font-weight: 600;
  padding: 20px;
}

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

.modalStyle {
  background-color: blanchedalmond;
}
</style>
