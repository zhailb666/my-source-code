let path = require('path');
const POnePlugins = require('./plugins/POne');
const PTwoPlugins = require('./plugins/PTwo');
const SomePluginsLifeCycle = require('./plugins/SomePluginsLifeCycle');
const ClearLog = require('./plugins/ClearLog');

module.exports ={
    mode: 'development',
    entry: "./src/index.js",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
          {
            test: /\.less$/,
            use: [
                path.resolve(__dirname, 'loader', 'style-loader'),
                path.resolve(__dirname, 'loader', 'less-loader')
            ],
          },
        ],
    },
    plugins: [
      new POnePlugins(),
      new PTwoPlugins(),
      new SomePluginsLifeCycle(),
      new ClearLog()
    ]
}