import sanity from '../sanity'

const sanityClient = sanity.create({
  baseURL: `http://localhost:3000/`,
  withCredential: false,
  headers: {},
})

export default {
  getSnippet() {
    return sanityClient.get('/snippet')
  },
  getSnippet(id) {
    return sanityClient.get('/snippet/' + id)
  },
}
