# y-components

## 说明

基于 element-ui 的组件库

## 文档

- https://yp910108.github.io/y-components

## 安装

```shell
# y-components 依赖于 element-ui，首先安装 element-ui
npm i element-ui@2.13.2 -S
npm i @yp910108/y-components -S

# 或
npm i element-ui@2.13.2 @yp910108/y-components -S
```

## 快速上手

```javascript
import Vue from 'vue'
import Element from 'element-ui'
import YComponents from '@yp910108/y-components'
import 'element-ui/lib/theme-chalk/index.css'
import '@yp910108/y-components/lib/theme/index.css'
import App from './App.vue'

Vue.use(YComponents)

new Vue({
  el: '#app',
  render: (h) => h(App)
})
```
