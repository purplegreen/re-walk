/* eslint-disable prettier/prettier */
import {
  groq
} from '@nuxtjs/sanity'


// import sanity from '../sanity'

export const state = () => ({
  all: [],
  selectedSnippet: {}
})

export const mutations = {
  SET_SNIPPETS(state, snippets) {
    state.all = snippets
  },
  SET_SELECTED_SNIPPET(state, snippet) {
    state.selectedSnippet = snippet
  },
}

export const actions = {
  async fetchSnippets({
    commit
  }) {
    const query = groq `*[_type == "snippet"]{
      _id,
      title,
      audio,
      "audioURL": audio.asset->url,
      duration,
      mainImage,
      body,
      shortText,
      location,
      alreadyPlayedInSeconds,
      isHighlighted
    }[0...29]`

    const result = await this.$sanity.fetch(query)
    commit('SET_SNIPPETS', result)
  },

  setSelectedSnippet({
    commit
  }, snippet) {
    commit('SET_SELECTED_SNIPPET', snippet)
  },
}
