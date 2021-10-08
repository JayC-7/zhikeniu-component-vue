import Vue from 'vue'
import App from './App'
import '../components/style'

Vue.config.productionTip = false
if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true
}

new Vue({
  render: h => h(App)
}).$mount('#app')
