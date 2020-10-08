<template>
  <section id="container">
    <ul v-if="loading == false">
      <li v-for="post in posts" ref="post" :key="post._id" class="card">
        <h3 class="">{{ post.title }}</h3>

        <img
          v-if="post.mainImage"
          class="mainImage"
          :src="imageUrlFor(post.mainImage).ignoreImageParams()"
        />

        <p class="block-content">
          <block-content :blocks="post.body" />
        </p>
      </li>
    </ul>
  </section>
</template>

<script>
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from 'sanity-blocks-vue-component'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import sanity from '../sanity'
if (process.client) {
  gsap.registerPlugin(TextPlugin, ScrollTrigger)
}
const imageBuilder = imageUrlBuilder(sanity)

const query = `*[_type == "post" ] | order(releaseDate desc)
{
  _id,
  title,
  mainImage,
  imageUrl,
  createdAt,
  releaseDate,
  body
}[0...29]`
export default {
  name: 'Posts',
  components: {
    BlockContent,
  },
  data() {
    return {
      loading: true,
      posts: [],
    }
  },
  watch: {
    $route: 'fetchData',
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.startAnimation()
  },
  methods: {
    imageUrlFor(source) {
      return imageBuilder.image(source)
    },
    fetchData() {
      this.error = this.post = null
      this.loading = true
      sanity
        .fetch(query)
        .then(
          (posts) => {
            this.posts = posts
            this.loading = false
          },
          (error) => {
            this.error = error
          }
        )
        .then(() => {
          this.startAnimation()
        })
    },
    startAnimation() {
      if (!process.client) return
      ScrollTrigger.defaults({
        toggleActions: 'restart pause resume none',
        // markers: true,
      })
      gsap.utils.toArray(this.$refs.post).forEach((el, i) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top center',
            end: 'bottom 30px',
            scrub: i * 0.1,
          },
          x: '40px',
          duration: 9,
        })
      })
    },
    head() {
      return {
        title: 'Listing',
      }
    },
  },
}
</script>

<style>
#container {
  margin: 0 auto;
  width: 300px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.mainImage {
  width: 80vw;
  height: auto;
}
.links {
  padding-top: 15px;
}
</style>
