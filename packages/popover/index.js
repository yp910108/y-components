import directive from './src/directive'
import Popover from './src/main'

Popover.install = (Vue) => {
  Vue.directive('popover', directive)
  Vue.component(Popover.name, Popover)
}

Popover.directive = directive

export default Popover
