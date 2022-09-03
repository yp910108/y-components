const fs = require('fs')
const path = require('path')
const json = require('../components')

const content = json.reduce((str, file) => {
  const filePath = path.join(__dirname, `../packages/theme/${file}.scss`)
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '', 'utf8')
  }
  str += `@import './${file}';\n`
  return str
}, '')

fs.writeFileSync(path.join(__dirname, '../packages/theme/index.scss'), content, 'utf8')
