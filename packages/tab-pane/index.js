import TabPane from './src/main'

TabPane.install = (Vue) => {
  Vue.component(TabPane.name, TabPane)
}

export default TabPane
