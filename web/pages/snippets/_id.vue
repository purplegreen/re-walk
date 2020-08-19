<template>
  <div class="snippet-header">
    <h1 class="title">
      {{ snippet.title }}
    </h1>
  </div>
</template>
<script>
import sanity from '@/sanity'
import { mapState } from 'vuex'

const query = `*[_type == "snippet"] {
  _id,
  title,
  mainImage,
  body,
  imageUrl
}[0]`

export default {
  asyncData(context) {
    return sanity
      .fetch(query, context.params.id)
      .then((data) => ({ snippet: data }))
  },
  // catch(e) {
  //   error({
  //     statusCode: 503,
  //     message: 'Unable to fetch snippet #' + params.id,
  //   })
  // },
  computed: mapState({
    snippet: (state) => state.snippet.snippets,
  }),
  head() {
    return {
      title: this.snippet.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'What you need to know about ' + this.snippet.title,
        },
      ],
    }
  },
}
</script>

<style scoped>
.prompt-box {
  position: relative;
  overflow: hidden;
  padding: 1em;
  margin-bottom: 24px;
  transform: scaleY(1);
}
.prompt-box > .title {
  margin: 0 0 0.5em;
}
.prompt-box > .title > .meta {
  margin-left: 10px;
}
.prompt-box > .actions {
  display: flex;
  align-items: center;
}
.prompt-box > button {
  margin-right: 0.5em;
}
.prompt-box > button:last-of-type {
  margin-right: 0;
}
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.snippet-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
