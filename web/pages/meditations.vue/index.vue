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
      >
        <div class="infoModalBackground">
          <div class="topInfoBox">
            <button class="infoModalClose" @click="$modal.hide('infoModal')">
              <BaseIcon class="closeInfo" name="close" />
            </button>
          </div>
          <div class="infoContent">
            <div class="infoBody">
              <Info :key="info._id"></Info>
            </div>
          </div>
        </div>
      </modal>

      <div class="snippets">
        <progress-bar :snippets="customWalkpath.composition"></progress-bar>
        <duration :total="customWalkpath.duration"></duration>
        <div class="wrap-title">
          <h3 class="list-title">Wähle merere Teile für deinen Weg</h3>
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
              >
                <BaseIcon id="check" alt="Check  snippet" name="check" />
              </span>
              <span v-else class="modal-button-ar insert" @click="add(snippet)">
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
            <p class="text-content">
              <SanityContent :blocks="snippet.shortText" />
            </p>

            <!-- REMOVE -->
            <span
              v-if="isSnippetSelected(snippet)"
              slot="icon"
              class="modal-button-ar"
              @click="remove(snippet)"
            >
              <BaseIcon id="remove" alt="Remove  snippet" name="remove" />
            </span>
            <!-- REMOVE END-->
          </BaseButton>

          <!-- SNIPPET CLOSING -->
        </div>
        <div class="wrap-button">
          <button :disabled="!isWalkpathReady" class="" @click="start">
            <BaseIcon id="start" alt="Start Walk" name="next" />
          </button>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapState } from 'vuex'
import ProgressBar from '@/components/progress-bar.vue'
import Info from '@/components/info.vue'
import Duration from '@/components/duration.vue'

import { SanityImage } from '@nuxtjs/sanity/dist/sanity-image'

export default {
  name: 'Snippets',
  components: {
    ProgressBar,
    Duration,
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
  border: 3px solid white;
  background-color: var(--wbeige);
}

.slide-enter-active {
  transition: 0.2s opacity ease;
}

.slide-leave-active {
  transition: 0.2s opacity ease;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
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
  // height: 76vh;
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
  margin: 16px 6px;
  padding: 22px;
  background-color: white;
  opacity: 0.6;
  transition: 0.3s;
  cursor: pointer;
  // border: 1px solid var(--wblue);
}

.selected {
  border: 1px solid var(--wverdefluoa);
  opacity: 1;

  &#add-small.icon {
    color: var(--hello);
  }

  &#check-small.icon {
    color: var(--wnightlila);
  }
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

.snippet-modal-content {
  padding: 10px 16px 30px 16px;
}

.snippet-title {
  display: flex;
  color: var(--wnightlila);
  padding: 6px 13px;
  align-self: center;
  align-items: center;
  justify-content: center;
}

#start.icon {
  --color-i: var(--wdarkpink);
}

.start-button {
  color: var(--wdarkpink);
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

.infoModalBackground {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding: 2rem;
}

.topInfoBox {
  position: relative;
  display: flex;

  justify-content: flex-end;
  height: 50px;
  width: 100%;
}

.closeInfo {
  position: relative;
  align-self: flex-end;
  display: flex;
}

.infoContent {
  position: relative;
  width: 100%;
  height: auto;
}

.infoBody {
  position: relative;
  display: flex;
  text-align: left;
  margin-bottom: 20px;
}
</style>
