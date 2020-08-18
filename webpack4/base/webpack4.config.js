let path = require('path');
const weconfig = require('./webpack.config.js')

// console.log(weconfig, 'weconfig')
weconfig.output.filename = 'bundle-v4.js';
module.exports = weconfig