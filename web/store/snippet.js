export const state = () => ({
  snippets: [],
  snippet: {},
})

export const mutations = {
  SET_SNIPPETS(state, snippets) {
    state.snippets = snippets
  },
}

export const actions = {}
