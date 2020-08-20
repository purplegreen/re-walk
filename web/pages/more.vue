<template>
  <div>
    <!-- <div v-if="loading" class="loading">Loading...</div> -->
    <!-- <div v-if="error" class="error">{{ error }}</div> -->
    <section>
      <client-only>
        <p class="block-content">
          <block-content :blocks="more.body" />
          <img
            v-if="more.mainImage"
            class="mainImage"
            :src="imageUrlFor(more.mainImage).ignoreImageParams()"
          />
        </p>
      </client-only>
    </section>
  </div>
</template>

<script>
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from 'sanity-blocks-vue-component'
import sanity from '../sanity'

const imageBuilder = imageUrlBuilder(sanity)

const query = `*[_type == "more"] {
  _id,
  title,
  mainImage,
  body,
  imageUrl
}[0]`

export default {
  name: 'More',
  components: {
    BlockContent,
  },
  asyncData(context) {
    return sanity.fetch(query, context.params).then((data) => ({ more: data }))
  },
  methods: {
    imageUrlFor(source) {
      return imageBuilder.image(source)
    },
  },
}
</script>

<style scoped>
main {
  display: flex;
  font-size: 1rem;
}

section {
  width: 70vw;
  margin: auto;
}

.block-content {
  margin-top: 15vh;
  font-size: 2rem;
}

@media screen and (max-width: 992px) {
  section {
    width: 80vw;
    margin: auto;
  }

  .block-content {
    font-size: 1.4rem;
  }
}
</style>
