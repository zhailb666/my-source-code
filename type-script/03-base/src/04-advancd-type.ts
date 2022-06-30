/*
 * @Author: your name
 * @Date: 2022-03-05 22:01:09
 * @Description: file content
 */
interface Bird {
    fly: () => any;
    layEggs: () => any;
}

interface Fish {
    swim: () => any;
    layEggs: () => any;
}

// 1、& 同时是 Bird 和 Fish
const b1: Bird & Fish  = {
    fly: function () {
        throw new Error("Function not implemented.");
    },
    swim: function () {
        throw new Error("Function not implemented.");
    },
    layEggs: function () {
        throw new Error("Function not implemented.");
    }
}

b1.fly()
b1.swim()
b1.layEggs()

// 2、| Bird 或者是 Fish
const b2: Bird | Fish  = {
    swim: function () {
        throw new Error("Function not implemented.");
    },
    layEggs: function () {
        throw new Error("Function not implemented.");
    }
}

b2.swim()

// 3、类型保护与区分类型

function getBirdOrFish():  Bird | Fish  {
    return b2;
}


const pet = getBirdOrFish()
// b3.swim() error: 因为无法区分 Bird 或 Fish 而报错;

// 区分的方式一: 类型断言 
if ((<Fish>pet).swim) {
    (<Fish>pet).swim();
} else {
    (<Bird>pet).fly();
}

// 区分的方式二:类型保护  要定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个 类型谓词
function isFish(pet1: Fish | Bird): pet1 is Fish {
    return (<Fish>pet1).swim !== undefined;
}
if (isFish(pet)) {
    pet.swim();
}else {
    pet.fly();
}

//class 区分的方式三: instanceof类型保护 
class Dog {
    eat() {
        
    }
}
class Cat {
    sleep() {

    }
}

type DC = () => Dog | Cat
// interface DC {
//     ():  Dog| Cat;
// }

let getDogOrCat0: DC
getDogOrCat0 = () => {
    const a = new Dog()
    return a
}

const ins1 = getDogOrCat0()
if(ins1 instanceof Dog ) {
    ins1.eat()
} else {
    ins1.sleep()
}


// 4、接口 vs. 类型别名的区别  info: 重要区别是类型别名不能被 extends和 implements
type Alias = { num: number }
interface Interface {
    num: number;
}

// ------------------------------------------------------------------------------------------

// keyof typeof 的联合使用
let b = { a: 2 }

type D = keyof typeof b


type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never })[T];
// type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
type A = Diff<"a" | "b" | "c", "a">;        // "b" | "c"


type C1 =  {
     a: "a", 
     b: "b",
     c: "c"
} & {
     b: never,
     d: never
}

type C2 = C1["a" | "b" | "c"]

function isNumber(x: any): x is number {
    return typeof x === "number";
}

type ConvertNumberToString<T> = {
  [K in keyof T]: T[K] extends string ? string : T[K]
}



type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never;
type Func = (user: string, user1: Number) => void

type Param = MyParameters<Func>

interface SomeProps {
    a: string,
    b: number,
    c: (e: MouseEvent) => void,
    d: (e: MouseEvent) => void,
    e: object,
}

type D3 = { [P in keyof SomeProps]:  SomeProps[P] extends (...args: any[]) => any ? SomeProps[P] : never }
type OmitNever<T> = Pick<T, {[P in keyof T]: T[P] extends never ? never : P}[keyof T]>;

type T1 = OmitNever<D3>;   


type D1 =  keyof SomeProps
type D2 =  SomeProps[keyof SomeProps]
