/* eslint-disable prettier/prettier */
const emptyWalkpath = {
  composition: [],
  duration: 0,
}

const selectedSnippet = {

}


export const state = () => ({
  walkpaths: [],
  customWalkpath: emptyWalkpath,
  walkpathInProgress: emptyWalkpath,
  isSnippetSelected: selectedSnippet,
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
    const index = state.customWalkpath.composition.findIndex(
      (e) => e._id === snippet._id
    )
    if (index !== -1) return
    state.customWalkpath.composition.push(snippet)
    state.customWalkpath.duration += snippet.duration
  },
  REMOVE_FROM_WALKPATH(state, snippet) {
    const index = state.customWalkpath.composition.findIndex(
      (e) => e._id === snippet._id
    )
    if (index === -1) return

    state.customWalkpath.composition.splice(index, 1)
    state.customWalkpath.duration -= snippet.duration
  },
  SET_WALKPATH_IN_PROGRESS(state, walkpath) {
    state.walkpathInProgress = walkpath
    if (!state.walkpathInProgress.duration) {
      state.walkpathInProgress.duration = walkpath.composition.reduce(
        (total, snippet) => {
          return total + snippet.duration
        },
        0
      )
    }
  },
  CALCULATE_SNIPPET_AUDIO_PROGRESS(state, index) {
    // reset progresses on snippet
    // if the user wants to skip to 3rd snippet i.e. index parameter is 2,
    // we assume that the first two are already played. If the index is 0,
    // it simply means that the user is starting from the beginning.
    state.walkpathInProgress.composition.forEach((element, i) => {
      element.alreadyPlayedInSeconds = index > i ? element.duration : 0
    })
  },
  HIGHLIGHT_SNIPPET(state, index) {
    state.walkpathInProgress.composition.forEach((element, i) => {
      element.isHighlighted = index === i
    })
  },
  SET_SNIPPET_IN_PROGRESS(state, snippet) {
    state.snippetInProgress = snippet
  },
}

export const actions = {
  SelectedSnippet({
    commit
  }, snippet) {
    commit('SELECTED_SNIPPET', snippet)
  },
  addToWalkpath({
    commit
  }, snippet) {
    commit('ADD_TO_WALKPATH', snippet)
  },
  removeFromWalkpath({
    commit
  }, snippet) {
    commit('REMOVE_FROM_WALKPATH', snippet)
  },
  setWalkpathInProgress({
    commit
  }, walkpath) {
    commit('SET_WALKPATH_IN_PROGRESS', walkpath)
  },
  calculateSnippetAudioProgress({
    commit
  }, index = 0) {
    commit('CALCULATE_SNIPPET_AUDIO_PROGRESS', index)
  },
  highlightSnippetAt({
    commit
  }, index) {
    commit('HIGHLIGHT_SNIPPET', index)
  },
  setSnippetInProgress({
    commit
  }, snippet) {
    commit('SET_SNIPPET_IN_PROGRESS', snippet)
  },
  resetWalkpath({
    commit
  }) {
    commit('CALCULATE_SNIPPET_AUDIO_PROGRESS', 0)
    commit('HIGHLIGHT_SNIPPET', -1)
  },
}
