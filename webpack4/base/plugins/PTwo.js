const fs = require('fs');
const ejs = require('ejs');
const path = require('path');


class PTwo {
    apply(compiler) {
        const { options } = compiler;
        const htmlPath = options.output.path;
        compiler.hooks.afterEmit.tapAsync('afterEmit', function(compilation, next) {
           const { assets } = compilation;
           const fileName = Object.keys(assets)[0];
           function emitFile() {
                let templateStr = fs.readFileSync(path.join(__dirname, '../', 'index.ejs'), 'utf-8');
                let code = ejs.render(templateStr, { fileName });
                fs.writeFileSync(`${htmlPath}/index.html`, code)
            }
            emitFile()
            console.log('在将内存中 assets 内容写到磁盘文件夹之后')
            next()
        })
    }
}

module.exports = PTwo;