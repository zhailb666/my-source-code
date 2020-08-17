
const path = require('path');
const process = require('process');
const fs = require('fs');
const generator = require('@babel/generator').default;
const babylon = require('babylon');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const ejs = require('ejs')

// console.log(parser, 'parser')
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
        this.run()
    }

    getSource(modulePath) {
        let content = fs.readFileSync(modulePath, 'utf-8');
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
        console.log(moduleName, '----name')
        let source = this.getSource(modulePath);
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
        this.buildModule(path.resolve(this.root, this.entry), true);

        this.emitFile();
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