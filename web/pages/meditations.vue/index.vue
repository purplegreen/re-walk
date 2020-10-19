<template>
  <client-only placeholder="Loading...">
    <div class="main-wrap">
      <!-- TITLE -->

      <!-- SNIPPETS BOARD -->

      <div class="snippets">
        <progress-bar :snippets="customWalkpath.composition"></progress-bar>
        <duration :total="customWalkpath.duration"></duration>
        <div class="wrap-title">
          <h3 class="list-title">Wähle Meditationen für deinen Weg</h3>
        </div>
        <div class="snippets-list">
          <button
            v-for="snippet of snippets"
            id="root"
            ref="snippet"
            :key="snippet._id"
            :style="isSnippetSelectedColor(snippet)"
            class="snippet"
            :class="{ selected: isSnippetSelected(snippet) }"
            @click="showModal(snippet), (isShow = false)"
          >
            <div class="snippet-title">
              <BaseIcon id="add-small" alt="add" name="add" />
              {{ snippet.title }}
            </div>
          </button>
        </div>

        <!-- MODAL OPENING -->
        <transition name="slide">
          <modal
            id="snippet-modal"
            name="snippet-modal"
            :adaptive="true"
            @before-open="beforeOpen"
          >
            <div class="snippet-modal-content">
              <!-- Close -->
              <div class="side-el">
                <button
                  class="modal-button"
                  @click="$modal.hide('snippet-modal')"
                >
                  <BaseIcon alt="Close snippet" class="close" name="close" />
                </button>
              </div>

              <!-- ADD and Remove -->
              <div class="wrap-button">
                <button
                  v-if="isSnippetSelected(selectedSnippet)"
                  class="modal-button"
                  @click="remove"
                >
                  <BaseIcon id="remove" alt="Remove  snippet" name="remove" />
                  <h3 class="caption-txt">Entfernen</h3>
                </button>
                <button v-else class="modal-button insert" @click="add">
                  <BaseIcon id="add" alt="Add snippet" name="add" />
                  <h3 class="caption-txt">In den Guided-Walk</h3>
                </button>
                <!-- ----  -->
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
            </div>
          </modal>
        </transition>
        <!-- MODAL CLOSING -->

        <div class="wrap-button">
          <button
            :disabled="!isWalkpathReady"
            class="modal-button"
            @click="start"
          >
            <BaseIcon id="start" alt="Start Walk" name="next" />
            <h3 class="caption-txt start-button">Guided Walk starten</h3>
          </button>
        </div>
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
      isShow: false,
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

<style lang="scss" scoped>
.main-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.wrap-title {
  position: relative;
  width: 90vw;
  margin: auto;
}

.list-title {
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: var(--border-radius);
  border: 3px solid white;
  background-color: var(--wbeige);
}

.slide-enter-active {
  transition: 0.2s opacity ease;
}

.slide-leave-active {
  transition: 0.2s opacity ease;
  //   -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  //   -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  //   -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  //   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
  max-height: 300px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}

.snippets {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: self-start;
  border-radius: var(--border-radius);
  border: 1px solid white;
  -webkit-box-shadow: 0px 6px 9px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 6px 9px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  margin-bottom: 17px;
  max-width: 414px;
  height: 76vh;
  padding-top: 10px;
  padding-bottom: 10px;
  background-image: url('../../static/back.svg');
  background-color: var(--wbeige);
  border: 3px solid white;
}

.snippets-list {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: scroll;
  border-radius: var(--border-radius);
  background-color: var(--wbeige);
  border: 3px solid white;
  height: 16vh;
  &::-webkit-scrollbar {
    width: 6px; /* width of the entire scrollbar */
  }
  &::-webkit-scrollbar-track {
    background: var(--wgreen); /* color of the tracking area */
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--wblue); /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
    border: 3px solid white; /* creates padding around scroll thumb */
  }
}

.snippet {
  // display: flex;
  // flex-direction: row;
  // flex-wrap: nowrap;
  // justify-content: space-around;
  align-items: stretch;
  border-radius: var(--border-radius-butt);
  border: 1px solid transparent;
  -webkit-box-shadow: 0px 6px 9px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 6px 9px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  margin: 16px 3px;
  background-color: var(--wyellow);
  cursor: pointer;
  border: 2px solid var(--wbeige);
}

.selected {
  background-color: var(--wblue);
}

.snippet:hover {
  transform: scale(1.02);
  box-shadow: 0 7px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.snippet:active {
  transform: scale(1);
  box-shadow: none;
}
.snippet:focus {
  outline: 0;
}

.snippet-modal-content {
  padding: 10px 16px 30px 16px;
}

.modal-button {
  border: 0;
  background-color: transparent;
}

.snippet-title {
  display: flex;
  color: white;
  padding: 0px 23px;
  align-self: center;
  align-items: center;
  justify-content: center;
}

/*In MODAL */

.side-el {
  display: flex;
  justify-content: flex-end;
}

.close {
  display: flex;
}

.inModalWrapper {
  margin: 50px 7px;
}

.inModalEl {
  padding-bottom: 17px;
}
.shortText {
  text-align: left;
}

#add.icon,
#add-small.icon,
#remove.icon,
#start.icon {
  --color-i: white;
}

#add-small.icon {
  width: 30px;
  height: 30px;
  padding-right: 6px;
}

// #start.icon {
//   --color-i: var(--wnightlila);
// }

// .start-button {
//   color: var(--wnightlila);
// }
</style>
