var cooking = require('cooking');
var Components = require('../components.json');
var config = require('./config');
var webpack = require('webpack')
cooking.set({
  entry: Components,
  dist: './lib',
  clean: false,
  format: 'cjs',
  extends: ['vue2'],
  minimize: false,
  externals: config.externals,
  alias: config.alias
});

cooking.add('plugin.Provide', new webpack.ProvidePlugin({
  '_': 'underscore'
}))
cooking.add('output.filename', '[name].js');
cooking.add('loader.js.exclude', config.jsexclude);
cooking.add('loader.scss', {
  test: /\.scss$/,
  loaders: ['style-loader', 'css-loader', 'sass-loader']
});
cooking.add('vue.preserveWhitespace', false);
module.exports = cooking.resolve();
