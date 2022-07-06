import Vue from 'vue'
import router from './router'

import Element from 'element-ui'
import YComponents from 'packages'

import App from './App'

import 'element-ui/lib/theme-chalk/index.css'
import 'packages/theme/index.scss'

Vue.use(Element, { size: 'small', zIndex: 10000 })
Vue.use(YComponents)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
