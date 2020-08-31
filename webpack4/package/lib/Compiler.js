
const path = require('path');
const process = require('process');
const fs = require('fs');
const generator = require('@babel/generator').default;
const babylon = require('babylon');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const { SyncHook } =  require('tapable');
const ejs = require('ejs')

class Compiler {
    constructor(config) {
        console.log(config, 'config')
        // entry output
        this.config = config;
        // 保存入口文件的路劲
        this.entryId;
        // 所有的模块依赖
        this.modules = {}
        this.entry = config.entry; // 入口路径
        //工作路径
        this.root = process.cwd();
        this.hooks = {
            entryOption: new SyncHook(),
            compile: new SyncHook(),
            afterCompile: new SyncHook(),
            afterPulgins: new SyncHook(),
            run: new SyncHook(),
            emit: new SyncHook(),
            afteremit: new SyncHook(),
            done: new SyncHook(),
        }

        let plugins = this.config.plugins
        if(Array.from(plugins)) {
            plugins.forEach(plugin => {
                plugin.apply(this)
            })
        }
        this.hooks.afterPulgins.call();
    }

    // loader实现
    loaderFilter(modulePath, source) {
        const rules = this.config.module && this.config.module.rules
        if(!rules || !rules.length) return source;
        let index = 0
        while(index < rules.length) {
            const { test, use} = rules[index]
            if(test.test(modulePath)) {
                let useIndex = use.length -1
                while(useIndex >= 0) {
                    const loader = require(use[useIndex])
                    source = loader(source)
                    useIndex--
                }
            }
            index++
        }

        return source;
    }

    getSource(modulePath) {
        let content = fs.readFileSync(modulePath, 'utf-8');
        content = this.loaderFilter(modulePath, content); {/*? 出现一个error*/}
        return content;
    }

    parse(source, parentPath) {
        let ast = babylon.parse(source);
        let dependencies = [];
        traverse(ast, {
            CallExpression({ node }){
                if(node.callee.name === 'require') {
                    node.callee.name = '__webpack_require__'
                    console.log(node.arguments[0].value, 'node')
                    let moduleName = node.arguments[0].value
    
                    console.log(moduleName, 'moduleName')
                    moduleName = path.extname(moduleName) ? moduleName : `${moduleName}.js`
                    moduleName = './' + path.join(parentPath, moduleName)
                    dependencies.push(moduleName);
                    node.arguments = [t.stringLiteral(moduleName)]
                }
            } 
        })

        let sourceCode = generator(ast).code;
        return { sourceCode, dependencies };
    }

    //构建模块
    buildModule(modulePath, isEntry) {
        // path路径操知识
        let moduleName = './' + path.relative(this.root, modulePath)
        if(isEntry) {
            this.entryId = moduleName;
        }
        let source = this.getSource(modulePath); // 这样所有文件都走这个方法；
        const dirnamePath = path.dirname(moduleName);
        const { sourceCode, dependencies } = this.parse(source, dirnamePath);

        this.modules[moduleName] = sourceCode;

        dependencies.forEach(dep => {
            this.buildModule(path.join(this.root, dep), false);
        })
    }

    emitFile() {
        let main = path.join(this.config.output.path, this.config.output.filename);
        let templateStr = this.getSource(path.join(__dirname, 'main.ejs'));
        let code = ejs.render(templateStr, {entryId: this.entryId, modules: this.modules});
        
        this.assets = {}
        this.assets[main] = code;
        fs.writeFileSync(main, this.assets[main])
    }

    run() {
        this.hooks.run.call()
        this.hooks.compile.call()
        this.buildModule(path.resolve(this.root, this.entry), true);
        this.hooks.afterCompile.call()
        this.emitFile();
        this.hooks.emit.call()
        this.hooks.done.call();
    }
}

module.exports = Compiler;

/**
 *
- 1、
path.resolve('/目录1/目录2', './目录3');
// 返回: '/目录1/目录2/目录3'

path.resolve('/目录1/目录2', '/目录3/目录4/');
// 返回: '/目录3/目录4' 

- 2、
path.dirname() 方法会返回 path 的目录名（）
path.dirname('/目录1/目录2/目录3');
// 返回: '/目录1/目录2'
 * 
 */ 