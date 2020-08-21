class POne {
    apply(compiler) {
        compiler.hooks.emit.tap('pone', function() {
            console.log('emit ----------------------------------------------');
        })
    }
}

module.exports = POne;

