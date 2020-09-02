let path = require('path');
const webpack = require('webpack');

module.exports ={
    mode: 'development',
    entry: "./src/index.dllPlugin.js",
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist1', 'dllPlugin')
    },
    devServer: {
      hot: true,
      port: 3000,
      open: true,
      contentBase: './dist1'
    },
    module: {
        noParse: /jquery/,
        rules: [
          {
            test: /\.js/,
            exclude: /node_modules/,
            include: path.resolve(__dirname, '..', 'src'),
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react',
                ]
              }
            }
          },
          {
            test: /\.less$/,
            use: [
                path.resolve(__dirname, '..', 'loader', 'style-loader'),
                path.resolve(__dirname, '..', 'loader', 'less-loader')
            ],
          },
        ],
    },
    plugins: [
      new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, 'dist1', 'dll-react', 'manifast.json') // 976kb - 6.2kb = 969.8kb
      })
    ]
}

// 速度优化：动态链接库，开发的时候打包效率提升效率
/**
 * 所以说 第一次使用 webpack.dll.config.js 文件会对第三方库打包，打包完成后就不会再打包它了，
 * 然后每次运行 webpack.config.js文件的时候，都会打包项目中本身的文件代码，当需要使用第三方依赖的时候，
 * 会使用 DllReferencePlugin插件去读取第三方依赖库。所以说它的打包速度会得到一个很大的提升
 */