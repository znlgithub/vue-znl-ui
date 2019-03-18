const path = require('path')
const utils = require('./utils')
var slugify = require('transliteration').slugify;
const basePath = path.resolve(__dirname, '../../');
var striptags = require('../strip-tags');
var md = require('markdown-it')();

var wrap = function(render) {
  return function() {
    return render.apply(this, arguments)
      .replace('<code v-pre class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">');
  };
};
function convert(str) {
  str = str.replace(/(&#x)(\w{4});/gi, function($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16));
  });
  return str;
}

module.exports={
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [
          path.join(basePath, 'site'),
          path.join(basePath, 'src'),
          path.join(basePath, 'libs')
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?.+)?$/,
        loader : 'file-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
          publicPath: '../',
        }
      },
      {
        test: /\.(jpe?g|png|gif)(\?.+)?$/,
        loader : 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[hash:7].[ext]')
        }
      },
      // {
      //   test: /\.md$/,
      //   loader : 'raw-loader',
      //   options: {
      //     limit: 10000,
      //     name: utils.assetsPath('docs/[name].[hash:7].[ext]')
      //   }
      // },
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader',
        options: {

          preset: 'default',
          breaks: true,
          preprocess: function(MarkdownIt, source) {
            MarkdownIt.renderer.rules.table_open = function() {
              return '<table class="table">';
            };
            MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence);
            return source;
          },
          use: [
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
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      } 
    ]
  },
  resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.join(basePath, 'src'),
        '~': path.join(basePath, 'src'),
        '~packages': path.join(basePath, 'packages'),
        '~static': path.join(basePath, 'static'),
        'static': path.join(basePath, 'static'),
        'asstes': path.join(basePath, 'asstes'),
        '~asstes': path.join(basePath, 'asstes'),
        '~node_modules': path.join(basePath, 'node_modules'),
        main: path.join(basePath, 'src'),
        packages: path.join(basePath, 'packages'),
        examples: path.join(basePath, 'examples'),
        'znl-ui': basePath,
        'site': path.join(basePath, 'site')
      }
    }
}