/*
 * @Author: your name
 * @Date: 2022-03-05 22:47:44
 * @Description: 函数
 */
// 方法的约定1
type Fn1 = (v: string) => number

// 方法的约定2
interface Fn2 {
   (n: number): number
}

let a3: Fn1 = (v) => {
    return 2* parseInt(v)
}
a3('112')

let a4: Fn2 = (v) => {
    return 2* v
}

// 方法的约定3
let a5 = (v: string):number => {
    return 2* parseInt(v)
}
// 方法的约定4
function a6(v: string):number {
    return 2* parseInt(v)
}

a4(112)
a5('6')
a6('2')

// 方法的重载
// 上边是声明
function add (arg1: number): string
function add (arg1: string): string
function add (arg1: string, arg2: string): string
function add (arg1: number, arg2: number): number
// 因为我们在下边有具体函数的实现，所以这里并不需要添加 declare 关键字

// 下边是实现
function add (arg1: string | number, arg2?: string | number) {
  // 在实现上我们要注意严格判断两个参数的类型是否相等，而不能简单的写一个 arg1 + arg2
  if (typeof arg1 === 'string' && typeof arg2 === 'string') {
    return arg1 + arg2
  } else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
    return arg1 + arg2
  }
}

console.log(add(1))



