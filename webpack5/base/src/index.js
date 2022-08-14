/*
 * @Author: your name
 * @Date: 2020-08-15 19:46:41
 * @Description: file content
 */
import './index.ignorePlugin'
import jquery from "./components/jquery";
const str = require('./components/s')

require('./style.less')

import React from "react";
import ReactDom from "react-dom";

ReactDom.render(<div>hello</div>, document.getElementById('root'))

console.log('2233');
log("webpack原理分析开始");
log("引用执行结果："+ str);
console.log(jquery)
