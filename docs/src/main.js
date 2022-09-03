import Vue from 'vue'
import router from './router'

import Element from 'element-ui'
import YComponents from 'packages'

import DemoBlock from './components/demo-block'

import App from './App'

import './styles/index.scss'

const icons = require.context('./icons', false, /\.svg$/)
for (const key of icons.keys()) {
  icons(key)
}

Vue.use(Element, { size: 'small', zIndex: 10000 })
Vue.use(YComponents)

Vue.component('demo-block', DemoBlock)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
