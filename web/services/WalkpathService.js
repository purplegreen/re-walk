import sanity from '../sanity'

const sanityClient = sanity.create({
  baseURL: `http://localhost:3000/`,
  withCredential: false,
  headers: {},
})

export default {
  getWalkpaths() {
    return sanityClient.get('/walkpaths')
  },
  getWalkpath(id) {
    return sanityClient.get('/walkpaths/' + id)
  },
}
