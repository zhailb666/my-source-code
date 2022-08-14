/*
 * @Author: your name
 * @Date: 2020-08-18 10:05:58
 * @Description: file content
 */
const less = require('less')
function loader(source) {
    console.log('**less-loader')
    let css = '';
    console.log(source, 'source')
    less.render(source, function(err, c) {
        css = c.css;
    })
    css = css.replace(/\n/g, '\\n')
    return css;
}

module.exports = loader;