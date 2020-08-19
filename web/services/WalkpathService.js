import sanity from '../sanity'

const apiClient = sanity.create({
  baseURL: `http://localhost:3000/`,
  withCredential: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getWalkpaths() {
    return apiClient.get('/walkpaths')
  },
  getWalkpath(id) {
    return apiClient.get('/walkpath/' + id)
  },
}
