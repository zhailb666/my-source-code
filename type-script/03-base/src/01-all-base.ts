/*
 * @Author: your name
 * @Date: 2022-03-05 15:39:43
 * @Description: file content
 */
// 1、布尔值
let isDone: boolean = false;

// 2、数字
let decLiteral: number = 1;

// 3、字符串
let name1: string = '1w';

// 4、数组
let list: string[] = ['1w'];
let list1: Array<string> = ['1w'];

// 5、元组 Tuple
let list3: [string, number] = ['1w',2];

// 5、枚举
enum Color { Red, Green, Blue};
enum Color1 { Red = 3, Green, Blue};

console.log(Color.Red)
console.log(Color1.Red, '枚举-----')

// 6、any 任意类型
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;

// 7、void 类型与any类型相反 通长用来表示没有值
function warnUser(): void {
    console.log("This is my warning message");
}

// 8、Null 和 Undefined 当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自
let u: undefined = undefined;
let n: null = null;

// 9、Never 类型表示的是那些永不存在的值的类型 
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 10、object 表示非原始类型，也就是除 number，string，boolean，symbol，null或undefined 之外的类型
declare var jQuery: (selector: string) => any;

// jQuery('#foo');
// declare ??? 的作用
// 上例中，declare var 并没有真的定义一个变量，只是定义了全局变量 jQuery 的类型，仅仅会用于编译时的检查，在编译结果中会被删除
// https://ts.xcatliu.com/basics/declaration-files.html

const a: Symbol = Symbol('11')
// 原始数据类型包括：布尔值、数值、字符串、null、undefined 以及 ES6 中的新类型 Symbol 和 ES10 中的新类型 BigInt