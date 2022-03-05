<!--
 * @Author: your name
 * @Date: 2021-11-17 22:50:24
 * @Description: typeScript 实践
-->

### 01-tsx: ts语法
- 01-tsx: tsc命令编译 ts文件
npm install -g typescript   执行tsc命名
tsc 01-tsx.ts

- 02-tsconfig: ts配置文件 & 与一些基本配置
tsc --init 生成 tsconfig.json
json文件的基本配置:
{
  include: "指定编译的文件路径",
  exclude: "排除编译的文件路径",
  compilerOptions: { // "编译选项"
    "target": "指定ECMAScript目标版本",
    "module": "指定生成哪个模块系统代码",
    "outDir": "设置输出目录"
  }
}
用node显示打印信息 node dist/demo.js

