<template>
  <div>
    <ul v-if="loading == false">
      <li v-for="info in infos" ref="info" :key="info._id">
        <h4>
          <SanityContent :blocks="info.body" />
        </h4>
      </li>
    </ul>
  </div>
</template>

<script>
import { SanityContent } from '@nuxtjs/sanity/dist/sanity-content'
import { groq } from '@nuxtjs/sanity'

const query = groq`*[_type == "info"]{
  _id,
  title,
  body
}[0...6]`

export default {
  name: 'Info',
  components: {
    SanityContent,
  },
  data: () => ({
    loading: true,
    infos: [],
  }),
  watch: {
    $route: 'fetchData',
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.error = this.info = null
      this.loading = true
      this.$sanity.fetch(query).then(
        (infos) => {
          this.infos = infos
          this.loading = false
        },
        (error) => {
          this.error = error
        }
      )
    },
  },
}
</script>

<style></style>
