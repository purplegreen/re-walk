import createPersistedState from 'vuex-persistedstate'

// eslint-disable-next-line prettier/prettier
export default ({
  store
}) => {
  createPersistedState({
    key: 'guided-walk',
    paths: [
      'walkpath.slotInProgress',
      'walkpath.walkpathInProgress',
      'walkpath.customWalkpath',
    ],
  })(store)
}
