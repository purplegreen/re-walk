<template>
  <div>
    <progress-bar
      :snippets="walkpathInProgress.composition"
      @onBarClicked="onBarClicked"
    ></progress-bar>

    <duration
      :total="walkpathInProgress.duration"
      :passed="durationPassed"
      :with-remaining="true"
    ></duration>

    <div class="audio-text-sw">
      <div class="audio-text-btns">
        <!-- select audio mode  -->
        <a
          class="audio-btn"
          :class="{ selected: mode === 'audio' }"
          @click="
            selectMode('audio')
            showModal1()
          "
        >
          <BaseIcon alt="Sound" name="sound" />
        </a>
        <!-- audio modal  -->

        <modal name="audioModal" transition="nice-modal-fade" :adaptive="true">
          <div class="side-el">
            <button @click="$modal.hide('audioModal')">
              <BaseIcon alt="Close" name="close" />
            </button>
          </div>

          <button v-if="isWalkpathRunning" @click="stop()">
            <BaseIcon class="stop-open" alt="Stop" name="stop" />
          </button>
          <button v-else @click="start()">
            <BaseIcon class="play-open" alt="Play" name="play" />
          </button>
        </modal>
        <!-- close audio modal  -->
        <!-- select text mode -->
        <a
          class="text-btn"
          :class="{ selected: mode === 'text' }"
          @click="
            selectMode('text')
            showModal2()
          "
        >
          <BaseIcon alt="Text" name="text" />
        </a>
        <!-- text modal  -->
        <modal name="textModal" transition="nice-modal-fade" :adaptive="true">
          <div class="side-el">
            <button @click="$modal.hide('textModal')">
              <BaseIcon alt="Close" name="close" />
            </button>
          </div>

          <div class="text-card">
            <div class="text-content">{{ snippetInProgress }}</div>
            <div v-if="walkpathInProgress.composition.length > 1">
              <div class="low-btn">
                <button
                  :disabled="indexOfLastPlayedSnippet == 0"
                  @click="previousSnippet"
                >
                  <BaseIcon alt="Previous" name="prev" />
                </button>

                <button
                  :disabled="
                    indexOfLastPlayedSnippet + 1 ==
                    walkpathInProgress.composition.length
                  "
                  @click="nextSnippet"
                >
                  <BaseIcon alt="Next" name="next" />
                </button>
              </div>
            </div>
          </div>
        </modal>
        <!-- close text modal  -->
      </div>
    </div>
    <div class="map">
      <img
        v-if="!snippetInProgress.location || !locationAcquired"
        :src="snippetInProgress.image"
      />
      <map-component
        v-if="snippetInProgress.location"
        :markers="markers"
        @locationAcquired="onLocationAcquired"
        @locationChanged="onLocationChange"
      ></map-component>
    </div>
    <div class="margin">
      <button @click="exit()">
        <BaseIcon alt="Exit" name="exit" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ProgressBar from '@/components/progress-bar.vue'
import Duration from '@/components/duration.vue'
// import MapComponent from '@/components/map.vue'

const R = 6378137 // Radius of earth in meters

export default {
  name: 'Walkpath',
  components: {
    ProgressBar,
    Duration,
    // MapComponent
  },
  data() {
    return {
      mode: 'audio',
      isWalkpathRunning: false,
      indexOfLastPlayedSnippet: 0,
      audio: new Audio(''),
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
      // return this.walkpathInProgress.composition
      //   .filter(s => !!s.location)
      //   .map(s => ({ position: s.location, text: s.name }));
    },
  },
  mounted() {
    if (!this.walkpathInProgress.composition.length) {
      this.$router.replace('/')
      return
    }
    this.$store.dispatch(
      'walkpath/setSnippetInProgress',
      this.walkpathInProgress.composition[0]
    )
  },

  methods: {
    ...mapActions([
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
        this.$router.push('about')
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
        this.$router.push('select')
      } else {
        this.$router.push('about')
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
.btn {
  border-radius: var(--border-radius);
  display: inline-block;
  width: 100px;
  cursor: pointer;

  &.selected {
    color: var(--fuchsia);
  }

  &:first-child {
    border-radius: 8px 0 0 8px;
  }

  &:last-child {
    border-radius: 0 8px 8px 0;
    border-left: none;
  }
}

.margin {
  margin: 20px;
}

.audio-text-sw {
  height: 20em;
  display: block;
  position: relative;
}

.audio-text-btns {
  height: 60px;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.audio-btn {
  padding-right: 10px;

  &.icon:active {
    --color-i: palegreen;
  }
}

.text-btn {
  padding-left: 1px;
}

.text-card {
  position: absolute;
  top: 40px;
  bottom: 3px;
  left: 3px;
  right: 3px;
}

.text-content {
  height: 160px;
  grid-row-end: 3;
  overflow: scroll;
  columns: 100vw 6;
  text-align: left;
  padding-bottom: 20px;
  margin: 20px;
}
.v--modal {
  // border: 2px solid var(--border-color);
  // border-radius: var(--border-radius);
  // background-color: white;
  // box-shadow: 0 20px 60px -2px rgba(27, 33, 58, 0.4);
  // padding: 0;
  background-color: khaki;
}

.v--modal-box {
  // position: relative;
  // border-radius: var(--border-radius);
  // max-width: 414px;
  // width: 96vw;
  // height: 96vh;
  // padding: 20px;
  background-color: red;
}

.v--modal-overlay .v--modal-box {
  // position: relative;
  // overflow: hidden;
  // box-sizing: border-box;
}

.play-open,
.stop-open {
  &.icon {
    width: 120px;
    height: auto;
    align-self: center;
    --color-i: #53c6e3;
    padding-top: 6em;
    z-index: 3;
  }
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease-out;
  background-color: #53c6e3;
}

.fade-leave-to {
  opacity: 0.9;
  background-color: blue;
}

.isaudio > .icon,
.istext > .icon {
  --color-i: #808000;
}

.side-el {
  position: absolute;
  width: 18px;
  height: 18px;
  right: 18px;
  top: 10px;
  width: 3rem;
  height: auto;
}

.low-btn {
  border: 1px solid red;
  margin: auto;
  text-align: center;
}

.map {
  height: 400px;

  img {
    min-height: 350px;
  }
}
</style>
