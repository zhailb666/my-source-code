/*
 * @Author: your name
 * @Date: 2022-03-05 15:39:43
 * @Description: file content
 */
export let b1:any = 995

console.log(b1)


// 1、 interview 获取方法数据有哪些
interface SomeProps {
    a: string;
    b:number;
    c: () => void;
    d: () => void;
}

type getFuncProper<T, K> = {[p in keyof T]: T[p] extends K ? p : never}[keyof T]


type A = getFuncProper<SomeProps, Function>

// TypeScript 中 any、unknown、never 和 void 有什么区别
/**
 * any: 任意类型；
 * unknown: 未知类型；
 * never: 永不存在的值类型
 * void: 无任何类型，没有类型
 */

let a: any = 's'
let b: unknown = '2'
let c: never
let c1: never
let d: void
let e: number = 9

a = e;
b = e;

e = a;
// -1 unknown 类型的变量不允许赋给 any 或 unknown 以外的变量
// e = b;

// -2 以任何类型都不能赋值给 never 类型（除了never本身之外）
// c = a


