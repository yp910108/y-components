const path = require('path')
const nodeExternals = require('webpack-node-externals')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const json = require('../components')

const entry = json.reduce((result, key) => {
  result[key] = path.join(__dirname, `../packages/${key}`)
  return result
}, {})

const externals = {}

for (const key of json) {
  externals[`packages/${key}`] = `@yp910108/y-components/lib/${key}`
}

module.exports = {
  mode: 'production',
  entry,
  output: {
    path: path.join(__dirname, '../lib'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      packages: path.join(__dirname, '../packages')
    }
  },
  externals: [externals, nodeExternals()],
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      }
    ]
  },
  plugins: [new VueLoaderPlugin(), new ProgressBarPlugin()]
}
