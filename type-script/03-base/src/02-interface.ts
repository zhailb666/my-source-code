/*
 * @Author: your name
 * @Date: 2022-03-05 15:39:43
 * @Description: file content
 */

// 1、接口 定义属性
interface SquareConfig {
  color?: string;
  readonly width?: number;
  height?: number;

  name: string
}

const a1: SquareConfig = {
    name: 'zlb',
}

// 2、接口  接口继承 & 定义可扩展属性
interface ESquareConfig extends SquareConfig {
  sex: boolean;
  [prop: string]: any
}

const e1: ESquareConfig = {
    sex: true,
    name: 'zlb',
    a: ''
}

// 3、接口 定义方法
interface SearchFunc {
  (source: string, subString: string): boolean;
}

const sf1: SearchFunc = (a, b) => {
    return true
}

// const sf2: SearchFunc
let sf2: SearchFunc
sf2 = function (a1, b1) {
    return true
}
sf2("1", '2')

// 3、接口 定义数组
interface SearchArr {
  [p: number]: number
}
const ar0: SearchArr = [1]


interface SearchArr1 {
  [p: number]: [number, string]
}
const ar1: SearchArr1 = [[1, '1'], [2,'12']]

// 4、一个接口可以继承多个接口，创建出多个接口的合成接口
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

// 5、一个接口继承类
class Control {
     color = 1;
}

interface SelectableControl extends Control {
    select(): void;
}


// 6、一个类实现一个 或 多个 接口
class MyImage implements SelectableControl {
    color = 3;
    select() { }
}

class MyImage2 implements SelectableControl, PenStroke {
    penWidth = 2;
    color = 3;
    select() { }
}