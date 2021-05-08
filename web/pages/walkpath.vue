<template>
  <section class="all-wrapper">
    <article class="upper-wrapper">
      <div class="progress-bar">
        <progress-bar
          :snippets="walkpathInProgress.composition"
          @onBarClicked="onBarClicked"
        ></progress-bar>
      </div>
      <!-- AUDIO BUTTON -->
      <button class="all-button">
        <span
          v-if="isWalkpathRunning"
          id="button-icon"
          slot="icon"
          @click="stop()"
        >
          <h6 id="button-caption">Pause</h6>
          <BaseIcon id="pause" alt="Stop" name="stop" />
        </span>
        <span
          v-else
          slot="icon"
          :class="{ selected: mode === 'audio' }"
          @click="start()"
        >
          <h6 id="button-caption">Audio Starten</h6>
          <BaseIcon id="go" alt="Sound" name="sound" />
        </span>
      </button>
      <!-- --  -->
      <!-- IMAGE  -->
      <SanityImage
        v-if="snippetInProgress.locationImage"
        project-id="0hyezyzt"
        auto="format"
        :asset-id="snippetInProgress.locationImage.asset._ref"
        class="back-img"
      />
    </article>

    <!-- MAP -->
    <div class="map">
      <!-- <SanityImage
        v-if="!snippetInProgress.location || !locationAcquired"
        project-id="0hyezyzt"
        :asset-id="snippetInProgress.mainImage.asset._ref"
        auto="format"
      /> -->
      <map-component
        v-if="snippetInProgress.location"
        :markers="markers"
        @locationAcquired="onLocationAcquired"
        @locationChanged="onLocationChange"
      >
      </map-component>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ProgressBar from '@/components/progress-bar.vue'
import MapComponent from '@/components/map.vue'
import { SanityImage } from '@nuxtjs/sanity/dist/sanity-image'

const R = 6378137 // Radius of earth in meters

export default {
  name: 'Walkpath',
  components: {
    ProgressBar,
    MapComponent,
    SanityImage,
  },
  data() {
    return {
      mode: 'audio',
      isWalkpathRunning: false,
      indexOfLastPlayedSnippet: 0,
      // audio: new Audio(''),
      locationAcquired: false,
    }
  },

  computed: {
    ...mapState({
      walkpathInProgress: (state) => state.walkpath.walkpathInProgress,
      snippetInProgress: (state) => state.walkpath.snippetInProgress,
    }),
    durationPassed() {
      if (this.mode === 'audio') {
        return this.walkpathInProgress.composition.reduce((total, snippet) => {
          return total + snippet.alreadyPlayedInSeconds
        }, 0)
      }

      return this.walkpathInProgress.composition.reduce((total, snippet, i) => {
        return i < this.indexOfLastPlayedSnippet
          ? total + snippet.duration
          : total
      }, 0)
    },
    markers() {
      return [
        {
          position: this.snippetInProgress.location,
          text: this.snippetInProgress.title,
        },
      ]
      // eslint-disable-next-line no-unreachable
      return this.walkpathInProgress.composition
        .filter((s) => !!s.location)
        .map((s) => ({ position: s.location, text: s.name }))
    },
  },
  mounted() {
    this.audio = new Audio('')

    if (!this.walkpathInProgress.composition.length) {
      this.$router.replace('/')
      return
    }
    this.$store.dispatch(
      '/walkpath/setSnippetInProgress/',
      this.walkpathInProgress.composition[0]
    )
  },

  methods: {
    ...mapActions('walkpath', [
      'setWalkpathInProgress',
      'calculateSnippetAudioProgress',
      'highlightSnippetAt',
      'setSnippetInProgress',
      'resetWalkpath',
    ]),
    selectMode(mode) {
      this.mode = mode
      this.pause()
      this.resetWalkpath()
      this.isWalkpathRunning = false
    },
    pause() {
      if (!this.audio.paused) {
        this.audio.pause && this.audio.pause()
      }
    },
    play(snippet, startFrom, index) {
      // check if it is different file. If not, no need to load again
      if (!this.audio.src.includes(snippet.audio)) {
        this.pause()
        this.audio.src = `${snippet.audioURL}?dl=`
        this.audio.load()

        this.audio.onloadedmetadata = () => {
          this.audio.currentTime = startFrom
          this.audio.play()
        }
      } else {
        this.audio.currentTime = startFrom
        this.audio.play()
      }

      this.audio.ontimeupdate = () => {
        if (this.audio.paused) return
        snippet.alreadyPlayedInSeconds = parseInt(this.audio.currentTime, 10)
      }

      this.audio.onended = () => {
        snippet.alreadyPlayedInSeconds = snippet.duration
        this.startSnippetAtIndex(index + 1)
      }
    },
    startSnippetAtIndex(index, startAudioOn = 0) {
      this.isWalkpathRunning = true
      if (!this.walkpathInProgress.composition[index]) {
        // we came to a point where there is no next snippet -> finish the walkpath
        this.isWalkpathRunning = false
        this.$router.push('/about')
        return
      }

      this.setSnippetInProgress(this.walkpathInProgress.composition[index])
      this.indexOfLastPlayedSnippet = index
      if (this.mode === 'audio') {
        this.calculateSnippetAudioProgress(index)
        this.play(this.snippetInProgress, startAudioOn, index)
      } else {
        // for now highlighting only happens for text mode
        this.highlightSnippetAt(index)
      }
    },
    onBarClicked(snippet, index, event) {
      // First we calculate the pixels to understand at which
      // time she wants to start playing. If she clicked on 20% from the left,
      // we start playing the track from that exact second.
      const rect = event.target.getBoundingClientRect()
      const width = rect.right - rect.left

      const x = event.clientX - rect.left // x position within the element clicked.
      const secondsInTrack = (x / width) * snippet.duration

      this.startSnippetAtIndex(index, secondsInTrack)
    },
    exit() {
      this.pause()
      this.resetWalkpath()
      if (this.walkpathInProgress._id) {
        // meaing that the user selected premade walkpath
        this.$router.push('/select')
      } else {
        this.$router.push('/about')
      }
      this.setWalkpathInProgress({
        composition: [],
      })
    },
    start() {
      if (this.isWalkpathRunning) return
      this.startSnippetAtIndex(
        this.indexOfLastPlayedSnippet,
        this.snippetInProgress.alreadyPlayedInSeconds
      )
    },
    onLocationAcquired(value) {
      this.locationAcquired = value
    },
    onLocationChange(location) {
      if (!location) return
      // find the nearest snippet
      let nearestDistance = Number.POSITIVE_INFINITY
      let nearestSnippet = null
      let nearestSnippetIndex = -1
      this.walkpathInProgress.composition.forEach((snippet, index) => {
        if (!snippet.location) return
        const dLat = ((location.lat - snippet.location.lat) * Math.PI) / 180
        const dLon = ((location.lng - snippet.location.lng) * Math.PI) / 180
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((location.lat * Math.PI) / 180) *
            Math.cos((snippet.location.lat * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const d = R * c
        if (d < nearestDistance) {
          nearestDistance = d
          nearestSnippet = snippet
          nearestSnippetIndex = index
        }
      })

      if (nearestDistance < process.env.VUE_APP_LOCATION_LIMIT) {
        if (this.snippetInProgress._id !== nearestSnippet._id) {
          this.startSnippetAtIndex(nearestSnippetIndex)
        }
      }
    },
    stop() {
      // this only makes sense in audio mode
      this.isWalkpathRunning = false
      this.pause()
    },
    nextSnippet() {
      this.startSnippetAtIndex(this.indexOfLastPlayedSnippet + 1)
    },
    previousSnippet() {
      this.startSnippetAtIndex(this.indexOfLastPlayedSnippet - 1)
    },
    showModal1() {
      this.$modal.show('audioModal')
    },
    hideModal1() {
      this.$modal.hide('audioModal')
    },
    showModal2() {
      this.$modal.show('textModal')
    },
    hideModal2() {
      this.$modal.hide('textModal')
    },
  },
}
</script>

<style lang="scss" scoped>
.upper-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
}

.all-wrapper {
  height: 86vh;
  position: relative;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
}

.all-button {
  width: 160px;
  height: 80px;
  align-self: center;
  margin: 1rem;
  background-color: white;
  border-radius: 18px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.13);
}
.all-button:hover {
  background-color: var(--wdarkpink);
}

#go.icon-colors {
  --color-i: var(--wdarkpink);
}

#button-icon {
  #go {
    &.icon {
      align-self: center;
      --color-i: var(--wdarkpink);
      cursor: pointer;
    }
  }
  #pause {
    &.icon {
      align-self: center;
      --color-i: var(--wdarkpink);
      cursor: pointer;
    }
  }
  #pause {
    &.icon-colors:hover {
      --color-i: white;
    }
  }
}

h6#button-caption {
  align-self: center;
  font-size: 0.8rem;
  font-weight: bold;
  line-height: 1.3rem;
  width: auto;
  color: var(--wdarkpink);
}

.all-button:hover {
  &.all-button:hover #button-caption {
    color: white;
  }
  &.all-button:hover #go.icon {
    --color-i: white;
  }
  &.all-button:hover #pause.icon {
    --color-i: white;
  }
}
</style>
