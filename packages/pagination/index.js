import Pagination from './src/main'

Pagination.install = (Vue) => {
  Vue.component(Pagination.name, Pagination)
}

export default Pagination
