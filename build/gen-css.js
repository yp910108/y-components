const fs = require('fs')
const path = require('path')

const files = fs.readdirSync(path.join(__dirname, '../packages/theme'))

const content = files.reduce((str, file) => {
  if (file !== 'index.scss' && !file.startsWith('_')) {
    str += `@import './${file.slice(0, -5)}';\n`
  }
  return str
}, '')

fs.writeFileSync(path.join(__dirname, '../packages/theme/index.scss'), content, 'utf8')
