import Tree from './src/main'

Tree.install = (Vue) => {
  Vue.component(Tree.name, Tree)
}

export default Tree
