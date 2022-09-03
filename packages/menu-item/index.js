import MenuItem from './src/main'

MenuItem.install = (Vue) => {
  Vue.component(MenuItem.name, MenuItem)
}

export default MenuItem
