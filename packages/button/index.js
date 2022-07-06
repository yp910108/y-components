import Button from './src/main'

Button.install = (Vue) => {
  Vue.component(Button.name, Button)
}

export default Button
