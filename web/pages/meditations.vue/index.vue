<template>
  <div class>
    <div class="wrap-title">
      <h1 class="with-padding">
        Create your Custom Walk by adding Meditations
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
        v-for="snippet in snippets"
        ref="snippet"
        :key="snippet._id"
        class="snippet"
        :class="{ selected: isSnippetSelected(snippet) }"
        :style="isSnippetSelectedColor(snippet)"
        @click="showModal(snipper)"
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
            <button @click="$modal.hide('snippet-modal')">
              <BaseIcon alt="Close snippet" name="close" />
            </button>
          </div>
          <ul>
            <li>
              <h2 class="with-padding">{{ selectedSnippet.title }}</h2>
            </li>
          </ul>
          <div class="wrap-buttons">
            <button v-if="isSnippetSelected(selectedSnippet)" @click="remove">
              <BaseIcon alt="Remove snippet" name="remove" />
            </button>
            <button v-else @click="add">
              <BaseIcon alt="Insert snippet" name="insert" />
            </button>
          </div>
        </div>
      </modal>
      <!-- MODAL CLOSING -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { groq } from '@nuxtjs/sanity'
import ProgressBar from '@/components/progress-bar.vue'
import Duration from '@/components/duration.vue'
const query = groq`*[_type == "snippet"]{
  _id,
  title,
  mainImage,
  imageUrl,
  createdAt,
  releaseDate,
  body
}[0...29]`

export default {
  name: 'Snippets',
  components: {
    ProgressBar,
    Duration,
  },
  async fetch() {
    this.snippets = await this.$sanity.fetch(query)
  },
  data: () => ({ snippets: [] }),
  computed: {
    ...mapState({
      // snippets: (state) => state.snippet.snippets,
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
      this.selectedSnippet = params.snippet
    },
    add() {
      this.addToWalkpath(this.selectedSnippet)
      this.$modal.hide('snippet-modal')
    },
    remove() {
      this.removeFromWalkpath(this.selectedSnippet)
      this.$modal.hide('snippet-modal')
    },
    start() {
      this.setWalkpathInProgress(this.customWalkpath)
      this.$router.push('walkpath')
    },
    isSnippetSelected(snippet) {
      const index = this.customWalkpath.composition.findIndex(
        (e) => e.id === snippet.id
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
