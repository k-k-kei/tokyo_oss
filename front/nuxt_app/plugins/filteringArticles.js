import Vue from 'vue'

Vue.filter('toUpperCase', (value) => {
  return value.toUpperCase()
})

Vue.filter('numberFormat', (value) => {
  return value.toLocaleString()
})
