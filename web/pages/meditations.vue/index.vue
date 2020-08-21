<template>
  <client-only>
    <div class>
      <div class="wrap-title">
        <h1 class="with-padding">
          Create your Custom Walk by adding Meditations
        </h1>
      </div>

      <div>
        <BaseIcon alt="Start Walk" name="next" />
      </div>
      <div class="snippets">
        <ul>
          <li
            v-for="snippet in snippets"
            ref="snippet"
            :key="snippet._id"
            class=""
          >
            <h6 class="centered">{{ snippet.title }}</h6>
          </li>
        </ul>
      </div>
    </div>
  </client-only>
</template>

<script>
// import { mapState, mapActions } from 'vuex'

import { groq } from '@nuxtjs/sanity'
const query = groq`*[_type == "snippet"] {
  _id,
  title,
  mainImage,
  body,
  imageUrl
}[0]`

export default {
  name: 'Snippets',
  components: {},
  data() {
    return {
      snippets: [],
    }
   async fetch() {
    const result = await this.$sanity.fetch(query)
    this.snippet = result
  },
  data: () => ({ snippet: '' }),
}
}
</script>

<style scoped>
.snippets {
  padding-top: 12px;
  padding-bottom: 40px;
}
.snippet {
  width: 22%;
  color: white;
  border-radius: var(--border-radius);
  -webkit-box-shadow: 0px 6px 9px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 6px 9px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  padding: 19px 0px;
  margin: 3px;
}
.snippet.selected {
  background: #add8e6;
}
.snippet-modal-content {
  padding: 10px;
}
.wrap-title {
  width: 90%;
  margin: auto;
}
</style>

<style lang="scss">
.centered {
  text-align: center;
  margin: auto;
}
.with-padding {
  padding-bottom: 20px;
}
.with-padding-10 {
  padding-bottom: 10px;
}
.with-margin {
  margin-bottom: 30px;
}
.wrap-buttons {
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
}
.t-icon {
  width: 50px;
  height: auto;
}
.side-el {
  position: absolute;
  width: 38px;
  height: 38px;
  right: 18px;
  top: 10px;
  width: 3rem;
  height: auto;
}
</style>
