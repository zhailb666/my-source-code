const webpack = require("webpack");
const path = require("path");
const { merge } = require("webpack-merge");
const fs = require("fs");

// plugins
const POnePlugins = require('../plugins/POne');
const PTwoPlugins = require('../plugins/PTwo');
const SomePluginsLifeCycle = require('../plugins/SomePluginsLifeCycle');
const ClearLog = require('../plugins/ClearLog');
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;


const defaultConfig = {
    mode: 'development',
    entry: {
        home: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'my_dist'),
        filename: '[name].[contenthash].bundle.js',
        library: `test-[name]`,
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    path.resolve(__dirname, '..', 'loader', 'style-loader'),
                    path.resolve(__dirname, '..', 'loader', 'less-loader')
                ],
            },
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
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
        ]
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'initial',
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10,
                    // minChunks: 2,
                    maxSize: 1024000
                },
                // react_vendor: {
                //     name: "react_vendor",
                //     test: /node_modules[\\/](.*)react(.*)[\\/]/,
                //     chunks: "initial",
                //     priority: 1,
                //     // minChunks: 2,
                //     enforce: true
                // }
            }
        }
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new POnePlugins(),
        new PTwoPlugins(),
        new SomePluginsLifeCycle(),
        new ClearLog()
    ]
}

let customerConfig = {};
const customPath = path.resolve(process.cwd(), 'w.config.js')
if (fs.existsSync(customPath)) {
    customerConfig = require(customPath);
}

// *_node运行所在文件夹, 当前文件夹
console.log(process.cwd(), customerConfig, __dirname, 'node运行所在文件夹, 当前文件夹')

//如果不写回调方法, 在失败的时候就不会产生output文件
const compiler = webpack(merge(defaultConfig, customerConfig), (err, stats) => {
    if(err) {
        console.log(err)
    }
    if(stats.hasErrors()) {
        console.log('打包失败')
        process.stderr.write(stats.toString('errors-only'))
        process.exit(1)
    }
    console.log("打包结束");
})

compiler.close(() => {
    console.log("关闭构建器");
});