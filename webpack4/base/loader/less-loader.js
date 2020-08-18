const less = require('less')
function loader(source) {
    let css = '';
    console.log(source, 'source')
    less.render(source, function(err, c) {
        console.log(c, 'ccccc')
        css = c.css;
    })
    css = css.replace(/\n/g, '\\n')
    return css;
}

module.exports = loader;