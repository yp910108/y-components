import Col from './src/main'

Col.install = (Vue) => {
  Vue.component(Col.name, Col)
}

export default Col
