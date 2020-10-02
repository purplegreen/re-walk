import Vue from 'vue'

Vue.filter('secondsToMinutes', function (value) {
  if (!value) return 0
  return (value / 60).toFixed()
})
