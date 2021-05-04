<template>
  <client-only placeholder="Loading...">
    <div class="main-wrap">
      <!-- TITLE -->

      <!-- SNIPPETS BOARD -->
      <modal
        v-show="showModal"
        :class="infoModal"
        :adaptive="true"
        name="infoModal"
        :click-to-close="false"
        :min-height="530"
      >
        <div class="infoModalBackground">
          <div class="infoBody">
            <Info :key="info._id"></Info>
          </div>

          <div class="close-box">
            <button class="infoModalClose" @click="$modal.hide('infoModal')">
              <BaseIcon class="closeInfo" name="next" />
            </button>
          </div>
        </div>
      </modal>

      <div class="wrap-snippets">
        <div class="snippets">
          <progress-bar :snippets="customWalkpath.composition"></progress-bar>
          <div class="wrap-title">
            <h4 class="list-title">
              Stelle deine meditationsreise zusammen und und gehe los
            </h4>
          </div>

          <!-- SNIPPET -->

          <div class="snippets-list">
            <BaseButton
              v-for="snippet of snippets"
              id="root"
              ref="snippet"
              :key="snippet._id"
              :style="isSnippetSelectedColor(snippet)"
              class="snippet"
              :class="{ selected: isSnippetSelected(snippet) }"
            >
              <div>
                <!-- ADD -->
                <span
                  v-if="isSnippetSelected(snippet)"
                  slot="icon"
                  class="modal-button-ar"
                  @click="remove(snippet)"
                >
                  <BaseIcon id="remove" alt="Remove  snippet" name="remove" />
                </span>
                <span
                  v-else
                  class="modal-button-ar insert"
                  @click="add(snippet)"
                >
                  <BaseIcon id="add" alt="Add snippet" name="add" />
                </span>
                <!-- ADD CLOSE-->
              </div>
              <div class="snippet-title">
                <h2>
                  {{ snippet.title }}
                </h2>
              </div>
              <SanityImage
                v-if="snippet.mainImage"
                project-id="0hyezyzt"
                auto="format"
                :asset-id="snippet.mainImage.asset._ref"
                class="modal-image"
              />
              <div class="text-content">
                <h6>
                  <SanityContent :blocks="snippet.shortText" />
                </h6>
              </div>

              <!-- REMOVE -->
              <span
                v-if="isSnippetSelected(snippet)"
                slot="icon"
                class="modal-button-ar"
              >
                <BaseIcon id="check" alt="Check  snippet" name="check" />
              </span>
              <!-- REMOVE END-->

              <span v-else>
                <BaseIcon id="check-off" alt="Check  snippet" name="check" />
              </span>
            </BaseButton>
            <!-- SNIPPET CLOSING -->
          </div>
          <div class="wrap-button">
            <h6 id="button-caption">gehe los</h6>
            <button :disabled="!isWalkpathReady" class="" @click="start">
              <BaseIcon id="start" alt="Start Walk" name="next" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapState } from 'vuex'
import ProgressBar from '@/components/progress-bar.vue'
import Info from '@/components/info.vue'
import { SanityImage } from '@nuxtjs/sanity/dist/sanity-image'

export default {
  name: 'Snippets',
  components: {
    ProgressBar,
    SanityImage,
    Info,
  },

  async fetch({ store }) {
    await store.dispatch('snippets/fetchSnippets')
  },

  data() {
    return {
      loading: true,
      selectedSnippet: {},
      infoModal: {},
      info: {},
      blocks: [],
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
  mounted() {
    setTimeout(() => this.showModal(), 100)
  },
  methods: {
    // ...mapActions([
    //   'addToWalkpath',
    //   'removeFromWalkpath',
    //   'setWalkpathInProgress',
    // ]),
    setSelected(snippet) {
      this.$store.dispatch(
        'snippets/setSelectedSnippet',
        this.setSelectedSnippet
      )
    },
    beforeOpen({ params }) {
      this.selectedSnippet = params.snippet
    },
    add(snippet) {
      // this.addToWalkpath(this.selectedSnippet)
      this.$store.dispatch('walkpath/addToWalkpath', snippet)
    },
    remove(snippet) {
      this.$store.dispatch('walkpath/removeFromWalkpath', snippet)
    },
    start() {
      this.$store.dispatch(
        'walkpath/setWalkpathInProgress',
        this.customWalkpath
      )
      this.$router.push('/walkpath')
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
    showModal(infoModal) {
      this.$modal.show('infoModal')
    },

    hide() {
      this.$modal.hide('infoModal')
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
  background-color: var(--wbeige);
  padding: 1.2rem 0.8rem;
  margin: 7px 0 4px 0;
}

h4.list-title {
  line-height: 1.3rem;
  font-size: 1rem;
  text-align: left;
}

.wrap-snippets {
  max-width: 414px;
  height: 100vh;
  max-height: 800px;
  border-radius: var(--border-radius);
  -webkit-box-shadow: 0px 6px 9px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 6px 9px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  background-image: url('../../static/back.svg');
  background-color: var(--wbeige);
  border: 3px solid white;
}

.snippets {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: flex-start;
  max-width: 414px;
  height: 86vh;
  max-height: 800px;
}

.snippets-list {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: scroll;
  border-radius: 16px;
  background-color: var(--wbeige);
  border: 3px solid white;
  // &::-webkit-scrollbar {
  //   width: 6px; /* width of the entire scrollbar */
  // }
  // &::-webkit-scrollbar-track {
  //   background: var(--wgreen); /* color of the tracking area */
  // }
  // &::-webkit-scrollbar-thumb {
  //   background-color: var(--wblue); /* color of the scroll thumb */
  //   border-radius: 20px; /* roundness of the scroll thumb */
  //   border: 3px solid white; /* creates padding around scroll thumb */
  // }
}

.snippet {
  // display: flex;
  // flex-direction: row;
  // flex-wrap: nowrap;
  // justify-content: space-around;
  align-items: stretch;
  border-radius: var(--border-radius-butt);
  -webkit-box-shadow: 0px 6px 9px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 6px 9px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  margin: 0.3rem;
  padding: 0.5rem;
  background-color: white;
  opacity: 0.6;
  transition: 0.3s;
  cursor: pointer;
  // border: 1px solid var(--wblue);
}

.selected {
  opacity: 1;
}

.snippet:hover {
  opacity: 1;
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

.snippet-title {
  display: flex;
  color: var(--wnightlila);
  padding: 6px 13px;
  align-self: center;
  align-items: center;
  justify-content: center;
}

.wrap-button {
  display: flex;
  flex-direction: row;
  border-radius: var(--border-radius-butt);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 13%);
  background-color: white;
  justify-content: space-around;
  padding: 0.2rem 1rem 0;
  cursor: pointer;
  align-items: center;
  align-content: center;
}

.wrap-button:hover #button-caption {
  color: white;
}
.wrap-button:hover #start.icon {
  --color-i: white;
}

.wrap-button:hover {
  background-color: var(--wblue);
}

#start.icon {
  --color-i: var(--wblue);
  width: 2.5rem;
  height: 2.5rem;
}

.start-button {
  --color-i: var(--wblue);
}

#button-caption {
  color: var(--wblue);
}
#button-caption:hover {
  color: white;
}

/*In MODAL */

.side-el {
  display: flex;
  justify-content: flex-end;
}

.wrap-modal-button {
  display: flex;
  flex-direction: row;
  border-radius: var(--border-radius-butt);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.13);
  background-color: var(--wblue);
  border: 2px solid var(--wverdefluo);
  justify-content: space-around;
  align-content: flex-start;
  padding: 6px;
  cursor: pointer;
}

.modal-image {
  display: flex;
  flex-direction: row;
  width: 230px;
  height: auto;
}

.modal-button-ar {
  display: flex;
  justify-content: center;
  border: 0;
}
.modal-button {
  display: flex;
  background-color: transparent;
  border: 0;
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

.text-content {
  border-bottom: 0.3rem;
}

.infoModalBackground {
  position: relative;
  width: 100%;
  overflow: scroll;
  height: 100%;
}

.infoBody {
  position: relative;
  text-align: left;
  padding: 1.3rem;
}

.close-box {
  position: relative;
  width: 100%;
  padding-top: 5px;
  bottom: 0px;
}

.closeInfo {
  width: 50px;
  height: 50px;
}
</style>
