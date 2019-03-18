var cooking = require('cooking');
var config = require('./config');
var webpack = require('webpack')
cooking.set({
  entry: './src/index.js',
  dist: './lib',
  clean: false,
  format: 'umd',
  moduleName: 'VueZnlUi',
  extends: ['vue2'],
  alias: config.alias,
  externals: { vue: config.vue }
});

cooking.add('plugin.Provide', new webpack.ProvidePlugin({
  '_': 'underscore'
}))
cooking.add('output.filename', 'index.js');
cooking.add('loader.js.exclude', config.jsexclude);
cooking.add('loader.scss', {
  test: /\.scss$/,
  loaders: ['style-loader', 'css-loader', 'sass-loader']
});
cooking.add('vue.preserveWhitespace', false);
module.exports = cooking.resolve();