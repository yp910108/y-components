const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

const config = {
  mode: process.env.NODE_ENV,
  devtool: isProd ? 'none' : 'eval-source-map',
  entry: isProd ? { docs: path.join(__dirname, '../docs/src/main.js') } : path.join(__dirname, '../docs/src/main.js'),
  output: {
    path: path.join(__dirname, '../docs/dist'),
    filename: '[name].[hash:7].js',
    chunkFilename: isProd ? '[name].[hash:7].js' : '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.md', '.json'],
    alias: {
      packages: path.join(__dirname, '../packages'),
      '@': path.join(__dirname, '../docs/src')
    }
  },
  optimization: {
    minimizer: []
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
        use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        exclude: [path.join(__dirname, '../docs/src/icons')]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: path.resolve(__dirname, './md-loader/index.js')
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        },
        include: [path.join(__dirname, '../docs/src/icons')]
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

if (isProd) {
  config.externals = {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    'highlight.js': 'hljs',
    'element-ui': 'ELEMENT'
  }
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:7].css'
    })
  )
  config.optimization.minimizer.push(
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: false
    }),
    new OptimizeCSSAssetsPlugin({})
  )
  // https://webpack.js.org/configuration/optimization/#optimizationsplitchunks
  config.optimization.splitChunks = {
    cacheGroups: {
      vendor: {
        test: /\/packages\//,
        name: 'y-components',
        chunks: 'all'
      }
    }
  }
}

module.exports = config
