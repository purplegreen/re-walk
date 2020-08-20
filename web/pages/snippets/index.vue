<template>
  <client-only>
    <div>
      <h1>Snippets</h1>
      hey
      <ul>
        <SnippetCard
          v-for="snippet in snippets"
          ref="snippet"
          :key="snippet._id"
          :snippet="snippet"
          class="box"
        >
          <h3 class="">{{ snippet.title }}</h3>
          <block-content :blocks="snippet.body" />
        </SnippetCard>
      </ul>
    </div>
  </client-only>
</template>
<script>
import SnippetCard from '@/components/SnippetCard.vue'
import { mapState } from 'vuex'
// import imageUrlBuilder from '@sanity/image-url'
import BlockContent from 'sanity-blocks-vue-component'
import sanity from '@/sanity'

// const imageBuilder = imageUrlBuilder(sanity)

const query = `*[_type == "snippet"] {
  _id,
  title,
  mainImage,
  body,
  imageUrl
}[0]`

export default {
  name: 'Snippet',
  components: {
    SnippetCard,
    BlockContent,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    id: {
      type: String,
    },
  },
  asyncData(context) {
    return sanity
      .fetch(query, context.params)
      .then((data) => ({ snippet: data }))
  },
  //  catch (e) {
  //   error({
  //     statusCode: 503,
  //     message: 'Unable to fetch snippets.',
  //   })
  // }
  computed: mapState({
    snippets: (state) => state.snippet.snippets,
  }),
  head() {
    return {
      title: 'snippet Listing',
    }
  },
}
</script>
