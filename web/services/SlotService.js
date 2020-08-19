import sanity from '../sanity'

const sanityClient = sanity.create({
  baseURL: `http://localhost:3000/`,
  withCredential: false,
  headers: {},
})

export default {
  getSlots() {
    return sanityClient.get('/slots')
  },
  getSlot(id) {
    return sanityClient.get('/slot/' + id)
  },
}
