class PTwo {
    apply(compiler) {
        compiler.hooks.afterPlugins.tap('afterPulgins', function() {
            console.log('afterPulgins --------------------------------');
        })
    }
}

module.exports = PTwo;