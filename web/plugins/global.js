import Vue from 'vue'
import BaseIcon from '../components/BaseIcon.vue'

const components = {
  BaseIcon,
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
