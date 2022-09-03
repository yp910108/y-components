import Card from './src/main'

Card.install = (Vue) => {
  Vue.component(Card.name, Card)
}

export default Card
