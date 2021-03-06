const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')

const basePath = path.resolve(__dirname, '../../')

process.env.NODE_ENV = 'development'

module.exports=merge(baseWebpackConfig, {
  devtool: 'eval',
  entry: [
    'webpack/hot/only-dev-server',
    './site/index'
  ],
  output: {
    path: path.resolve(basePath, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap:true
    })
  },
  plugins: [    
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.ProvidePlugin({
      '_': 'underscore'
    }),
    new HtmlWebpackPlugin({
      filename:'index.html',
      template: './site/index.html',      
      favicon: path.join(basePath, 'site/assets/znlerp.ico'),
      inject: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})