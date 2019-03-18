var cooking = require('cooking');
var config = require('./config');
var md = require('markdown-it')();
var CopyWebpackPlugin = require('copy-webpack-plugin');
var striptags = require('./strip-tags');
var slugify = require('transliteration').slugify;
var isProd = process.env.NODE_ENV === 'production';
var isPlay = !!process.env.PLAY_ENV;
var webpack = require('webpack')

function convert(str) {
  str = str.replace(/(&#x)(\w{4});/gi, function($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16));
  });
  return str;
}

cooking.set({
  entry: isProd ? './site/entry.js' : (isPlay ? './examples/play.js' : './site/entry.js'),
  dist: './dist/site/',
  template: [
    {
      template: './site/index.tpl',
      filename: './index.html',
      favicon: './site/assets/znlerp.ico'
    }
  ],
  publicPath: process.env.CI_ENV || '',
  hash: true,
  devServer: {
    enable: true,
    hostname: 'localhost',
    port: 8001,
    hot: true,
    log: false,
    publicPath: '/'
  },
  minimize: true,
  chunk: isProd ? {
    'common': { name: ['znl-ui', 'manifest'] }
  } : false,
  extractCSS: true,
  alias: config.alias,
  extends: ['vue2', 'lint'],
  postcss: config.postcss
});

cooking.add('plugin.Provide', new webpack.ProvidePlugin({
      '_': 'underscore',
      '$': 'jquery',
      'jquery': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
      'root.jQuery': 'jquery'
}))

// fix publicPath
if (!process.env.CI_ENV) {
  cooking.add('output.publicPath', '');
}

cooking.add('loader.md', {
  test: /\.md$/,
  loader: 'vue-markdown-loader'
});

cooking.add('loader.ico', {
  test: /\.ico$/,
  loader: 'url-loader'
});

cooking.add('loader.scss', {
  test: /\.scss$/,
  loaders: ['style-loader', 'css-loader', 'sass-loader']
});

cooking.add(
  'output.chunkFilename',
  isProd ? '[name].[chunkhash:7].js' : '[name].js'
);

var wrap = function(render) {
  return function() {
    return render.apply(this, arguments)
      .replace('<code v-pre class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">');
  };
};

// if (isProd) {
//   cooking.add('externals.vue', 'Vue');
//   cooking.add('externals.vue-router', 'VueRouter');
// }

cooking.add('plugin.CopyWebpackPlugin', new CopyWebpackPlugin([
  { from: 'site/versions.json' }
]));
cooking.add('vue.preserveWhitespace', false);

let cookingConfig = cooking.resolve()

cookingConfig.module.rules[8].options = {}
cookingConfig.module.rules[8].options.use = [
  [require('markdown-it-anchor'), {
    level: 2,
    slugify: slugify,
    permalink: true,
    permalinkBefore: true
  }],
  [require('markdown-it-container'), 'demo', {
    validate: function(params) {
      return params.trim().match(/^demo\s*(.*)$/);
    },

    render: function(tokens, idx) {
      var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        var description = (m && m.length > 1) ? m[1] : '';
        var content = tokens[idx + 1].content;
        var html = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1');
        var script = striptags.fetch(content, 'script');
        var style = striptags.fetch(content, 'style');
        var jsfiddle = { html: html, script: script, style: style };
        var descriptionHTML = description
          ? md.render(description)
          : '';

        jsfiddle = md.utils.escapeHtml(JSON.stringify(jsfiddle));

        return `<demo-block class="demo-box" :jsfiddle="${jsfiddle}">
                  <div class="source" slot="source">${html}</div>
                  ${descriptionHTML}
                  <div class="highlight" slot="highlight">`;
      }
      return '</div></demo-block>\n';
    }
  }],
  [require('markdown-it-container'), 'tip'],
  [require('markdown-it-container'), 'warning']
]

cookingConfig.module.rules[8].options.preprocess = function(MarkdownIt, source) {
  MarkdownIt.renderer.rules.table_open = function() {
    return '<table class="table">';
  };
  MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence);
  return source;
}

module.exports = cookingConfig;
