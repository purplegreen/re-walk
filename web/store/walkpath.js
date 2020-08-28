/* eslint-disable prettier/prettier */


export const state = () => ({
  walkpaths: [],
  customWalkpath: {
    composition: [],
    duration: 0,
  },
  walkpathInProgress: {
    composition: [],
    duration: 0,
  },
  snippetInProgress: {},
  error: false,
  errorMessage: '',
  success: false,
})

export const mutations = {
  SELECTED_SNIPPET(state, snippet) {
    const index = this.customWalkpath.composition.findIndex(
      (e) => e.id === snippet.id
    )
    if (index !== -1) return
    state.isSnippetSelected.push(snippet)
  },

  ADD_TO_WALKPATH(state, snippet) {
    // const index = state.customWalkpath.composition.findIndex(
    //   (e) => e._id === snippet._id
    // )
    // if (index !== -1) return
    state.customWalkpath.composition.push(snippet)
    // state.customWalkpath.duration += snippet.duration
  },
}

export const actions = {
  async SelectedSnippet({
    commit
  }, snippet) {
    await commit('SELECTED_SNIPPET', snippet)
  },
  async addToWalkpath({
    commit
  }, snippet) {
    await commit('ADD_TO_WALKPATH', snippet)
  },
}
