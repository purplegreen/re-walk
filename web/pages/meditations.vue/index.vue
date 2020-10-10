<template>
  <client-only placeholder="Loading...">
    <div class="main-wrap">
      <!-- TITLE -->
      <div class="wrap-title">
        <h1 class="with-padding">
          Wähle Meditationen für deinen Weg
        </h1>
      </div>
      <!-- SNIPPETS BOARD -->
      <div class="snippets">
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
              <ul class="inModalWrapper">
                <li class="inModalEl">
                  <h2 class="with-padding">
                    {{ selectedSnippet.title }}
                  </h2>
                </li>
                <li class="inModalEl">
                  <h3 class="with-padding-10">
                    {{ selectedSnippet.duration | secondsToMinutes }} min
                  </h3>
                </li>
                <li class="inModalEl shortText">
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
.main-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.wrap-title {
  padding-top: 50px;
  padding-bottom: 50px;
  width: 90%;
  margin: auto;
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

.snippets,
.snippet {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  border-radius: var(--border-radius);
  border: 1px solid transparent;
  -webkit-box-shadow: 0px 6px 9px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 6px 9px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  background-color: #d4c48a;
}

.snippets {
  margin-bottom: 17px;
  max-width: 414px;
}

.snippet {
  margin: 7px 3px;
}

.snippets:hover,
.snippet:hover {
  background-color: #b4ae8c;
}
.snippet.selected {
  background-color: #88ab84;
}
.snippet-modal-content {
  padding: 10px;
}

.modal-button {
  border: 0;
  background-color: transparent;
}

.snippet-title {
  color: white;
  padding: 8px 12px;
}

/*In MODAL */
.inModalWrapper {
  margin: 50px 7px;
}

.inModalEl {
  padding-bottom: 17px;
}
.shortText {
  text-align: left;
}
</style>
