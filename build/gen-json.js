const fs = require('fs')
const path = require('path')

const files = fs.readdirSync(path.join(__dirname, '../packages'))

const content = files
  .reduce((str, file) => {
    if (!['index.js', 'utils', 'theme'].includes(file)) {
      str += `\n  "${file}",`
    }
    return str
  }, '')
  .slice(0, -1)

fs.writeFileSync(path.join(__dirname, '../components.json'), `[${content}\n]\n`, 'utf8')
