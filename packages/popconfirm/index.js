import Popconfirm from './src/main'

Popconfirm.install = (Vue) => {
  Vue.component(Popconfirm.name, Popconfirm)
}

export default Popconfirm
