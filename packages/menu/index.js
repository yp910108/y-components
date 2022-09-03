import Menu from './src/main'

Menu.install = (Vue) => {
  Vue.component(Menu.name, Menu)
}

export default Menu
