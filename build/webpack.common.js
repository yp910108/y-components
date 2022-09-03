const path = require('path')
const nodeExternals = require('webpack-node-externals')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, '../packages/index.js'),
  output: {
    path: path.join(__dirname, '../lib'),
    filename: 'y-components.common.js',
    libraryTarget: 'commonjs2',
    libraryExport: 'default'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      packages: path.join(__dirname, '../packages')
    }
  },
  externals: nodeExternals(),
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
