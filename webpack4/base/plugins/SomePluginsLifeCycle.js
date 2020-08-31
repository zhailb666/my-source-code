const { networkInterfaces } = require("os")

class SomePluginsLifeCycle {
    apply(compiler) {
        compiler.hooks.entryOption.tap('entryOption', function(context, entry) {
            console.log('初始化 option');
        })

        compiler.hooks.run.tapAsync('run', function(compiler, next) {
            next();
            return compiler
        })

        compiler.hooks.compile.tap('compile', function(compilationParams) {
            console.log('真正开始的编译，在创建 compilation 对象之前')
        })

        compiler.hooks.compilation.tap('compilation', function(compilation, compilationParams) {
            console.log('生成好了 compilation 对象，可以操作这个对象啦')
            compilation.hooks.buildModule.tap('SourceMapDevToolModuleOptionsPlugin',
                module => {
                    // console.log(module, 'module')
                    const { parser } = module;
                    // console.log(parser, 'parser')
                    console.log('buildModule-SourceMapDevToolModuleOptionsPlugin ----------XXXXXXXXXXX-----XXXXXXX');
                    module.useSourceMap = true;
                }
            )
        })

        compiler.hooks.make.tapAsync('make', function(compilation, done) {
            console.log('从 entry 开始递归分析依赖，准备对每个模块进行 build')
            done();
        })

        // 这个地方执行的是loader函数
        compiler.hooks.afterCompile.tapAsync('afterCompile', function(compilation, next) {
            console.log('编译 build 过程结束')
            next()
        })

        compiler.hooks.emit.tapAsync('emit', function(compilation, next) {
            console.log('在将内存中 assets 内容写到磁盘文件夹之前')
            next()
        })

        compiler.hooks.afterEmit.tapAsync('afterEmit', function(compilation, next) {
            const { assets } = compilation;
            console.log('在将内存中 assets 内容写到磁盘文件夹之后')
            next()
        })

        compiler.hooks.done.tapAsync('done', function(stats, next) {
            console.log('完成所有的编译过程')
            next()
        })

        compiler.hooks.failed.tap('failed', function(error) {
            console.log('编译失败的时候')
        })
    }
}

module.exports = SomePluginsLifeCycle;

