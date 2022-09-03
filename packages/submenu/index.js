import Submenu from './src/main'

Submenu.install = (Vue) => {
  Vue.component(Submenu.name, Submenu)
}

export default Submenu
