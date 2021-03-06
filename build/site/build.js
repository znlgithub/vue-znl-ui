const ora = require('ora')
const chalk = require('chalk')
// const rm = require('rimraf')
const webpack = require('webpack')
const WebpackConfig = require('./webpack.prod.conf.js')
// const WebpackConfig = require('../cooking.demo.js')

var spinner = ora('building for production...')
spinner.start()

webpack(WebpackConfig, (err, stats) => {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
})
