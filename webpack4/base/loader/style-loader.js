/*
 * @Author: your name
 * @Date: 2020-08-18 10:05:44
 * @Description: file content
 */
function loader(source) {
    console.log('**style-loader')
    const style = `
        let style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(source)}
        document.head.appendChild(style)
    `
    return style;
}

module.exports = loader;