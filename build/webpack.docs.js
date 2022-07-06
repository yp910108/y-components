const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: path.join(__dirname, '../docs/src/main.js'),
  output: {
    path: path.join(__dirname, '/docs'),
    filename: '[name].[hash:7].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      packages: path.join(__dirname, '../packages'),
      '@': path.join(__dirname, '../docs/src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        exclude: [path.join(__dirname, '../docs/src/views/icon/svg')]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        },
        include: [path.join(__dirname, '../docs/src/views/icon/svg')]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../docs/public/index.html'),
      filename: 'index.html',
      favicon: path.join(__dirname, '../docs/public/favicon.ico')
    }),
    new VueLoaderPlugin(),
    new ProgressBarPlugin()
  ],
  devServer: {
    port: 1527,
    publicPath: '/',
    proxy: {
      '/api': {
        target: 'http://localhost:3001/',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
