var fs = require('fs');
var path = require('path');
var version = process.env.VERSION || require('../../package.json').version;
var content = { '1.4.13': '1.4', '2.0.11': '2.0', '2.1.0': '2.1', '2.2.2': '2.2' };
if (!content[version]) content[version] = '2.3';
fs.writeFileSync(path.resolve(__dirname, '../../site/versions.json'), JSON.stringify(content));