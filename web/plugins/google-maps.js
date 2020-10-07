import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import '@/style/index.scss'

Vue.use(VueGoogleMaps, {
  load: {
    key: '',
    // libraries: 'places',
  },
})
