import Option from './src/main'

Option.install = (Vue) => {
  Vue.component(Option.name, Option)
}

export default Option
