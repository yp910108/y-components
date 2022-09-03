const fs = require('fs')
const path = require('path')
const uppercamelcase = require('uppercamelcase')
const json = require('../components')

const strImports = json.reduce((str, key) => {
  str += `import ${uppercamelcase(key)} from './${key}'\n`
  return str
}, '')

const strComponents = json
  .reduce((str, key) => {
    if (!['loading', 'message', 'message-box', 'notification'].includes(key)) {
      str += `\n  ${uppercamelcase(key)},`
    }
    return str
  }, '')
  .slice(0, -1)

const content = `${strImports}
const components = [${strComponents}
]

const install = (Vue) => {
  for (const component of components) {
    Vue.component(component.name, component)
  }
  Vue.directive('popover', Popover.directive)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '${process.env.VERSION || require('../package.json').version}',
  install,
  Loading,
  Message,
  MessageBox,
  Notification,${strComponents}
}
`

fs.writeFileSync(path.join(__dirname, '../packages/index.js'), content, 'utf8')
