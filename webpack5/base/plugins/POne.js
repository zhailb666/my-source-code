/*
 * @Author: your name
 * @Date: 2020-08-20 17:31:58
 * @Description: file content
 */
class POne {
    apply(compiler) {
        compiler.hooks.emit.tap('pone', function() {
            console.log('**plugins-POne')
            console.log('emit ----------------------------------------------');
        })
    }
}

module.exports = POne;

