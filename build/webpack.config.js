const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const babelPluginTransformVueJsx = require('babel-plugin-transform-vue-jsx')

const isProduction = process.env.NODE_ENV === 'production'

function resolve(dir) {
  return path.join(__dirname, '../', dir)
}

module.exports = {
  entry: resolve('src/index.js'),
  output: {
    path: resolve('dist'),
    publicPath: '/dist/',
    filename: isProduction ? 'vue-znl-ui.js' : 'build.js',
    library: 'vueZnlUi', // 使用require时的模块名
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000
      }
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000
      }
    },
    {  
      test: /\.(css|scss)$/,  
      loader: 'style-loader!css-loader!sass-loader'  
    } 
  ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      '_': 'underscore'
    })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '~': resolve('src'),
      'znl-ui': resolve('/'),
      'packages': resolve('packages'),
      '~packages': resolve('packages'),
      '~static': resolve('static'),
      'static': resolve('static'),
      'assets': resolve('src/assets'),
      '~assets': resolve('src/assets'),
      '~node_modules': resolve('node_modules')
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    port: 9066
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (isProduction) {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new CopyWebpackPlugin([
      {from:resolve('packages/theme-chalk/lib'),to:resolve('dist/themem-default')},
      {from:resolve('packages/theme-chalk/lib'),to:resolve('lib/theme-chalk')}
    ])
  ])
}