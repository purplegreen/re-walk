<template>
  <div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <section>
      <a
        href="https://www.urbanekuensteruhr.de/de#/detail/kuenstler/deborah-ligorio"
        class="credits"
        ><h2>Urbane Künste Ruhr</h2></a
      >
      <p v-if="loading == false" id="block-content">
        <block-content :blocks="about.body" :serializers="{ serializers }" />

        <img
          v-if="about.mainImage"
          id="mainImage"
          :src="imageUrlFor(about.mainImage)"
        />
      </p>
    </section>
  </div>
</template>

<script>
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from 'sanity-blocks-vue-component'
import sanity from '../sanity'

const imageBuilder = imageUrlBuilder(sanity)

const serializers = {
  marks: {
    externalLink: ({ mark, children }) => {
      const { blank, url } = mark
      return blank ? (
        <a href={url} target="_blank" rel="noopener">
          {children}
        </a>
      ) : (
        <a href={url}>{children}</a>
      )
    },
  },
}

const query = `*[_type == "about"] {
  _id,
  title,
  mainImage,
  body,
  imageUrl
}[0]`

export default {
  name: 'About',
  components: {
    BlockContent,
  },
  data() {
    return {
      loading: true,
      blocks: [],
      serializers,
    }
  },
  watch: {
    $route: 'fetchData',
  },
  created() {
    this.fetchData()
  },
  methods: {
    imageUrlFor(source) {
      return imageBuilder.image(source)
    },
    fetchData() {
      this.error = this.about = null
      this.loading = true
      sanity.fetch(query).then(
        (about) => {
          this.about = about
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

<style lang="scss" scoped>
main {
  display: flex;
  font-size: 1rem;
}

.credits h2 {
  margin-top: 65px;
  text-align: left;
  margin-left: 1rem;
}

section {
  width: 100vw;
  max-width: 414px;
  margin: auto;
}

#block-content {
  margin: 2rem 1.2rem;
  width: 90%;

  text-align: left;
}

#mainImage {
  max-width: 100%;
  width: 90vw;
  height: auto;
  position: relative;
  display: block;
}
</style>
