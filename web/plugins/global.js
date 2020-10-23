import Vue from 'vue'
import BaseIcon from '../components/BaseIcon.vue'
import BaseButton from '../components/BaseButton.vue'

const components = {
  BaseIcon,
  BaseButton,
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
