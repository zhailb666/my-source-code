/*
 * @Author: your name
 * @Date: 2022-03-05 22:51:08
 * @Description: 装饰器
 */
// 类装饰器
function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
    console.log(constructor.name)
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

@classDecorator
class Greeter {
    property = "property";
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }
}

console.log(new Greeter("world"));
console.log('类装饰器---------------');

// 方法装饰器
function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(target, propertyKey, descriptor)
        target.v = Date.now()
        descriptor.enumerable = value;
        // 改变原方法
        descriptor.value = (...arg: any[]) => {
            console.log(arg)
        }
        console.log(9999)
    };
}

class GreeterFn {
    property = "property123";
    hello: string;
    static v = 1
    constructor(m: string) {
        this.hello = m;
    }
    @enumerable(false)
    paly(s: string) {
        console.log(s)
    }
}
var q = new GreeterFn("world99")
// console.log();
q.paly('hei')
console.log('方法装饰器---------------');
// 属性装饰器

// function enumerable(value: boolean) {
//     return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         console.log(target, propertyKey, descriptor)
//         target.v = Date.now()
//         descriptor.enumerable = value;
//         descriptor.value = (...arg: any[]) => {
//             console.log(arg)
//         }
//         console.log(9999)
//     };
// }

class GreeterFn1 {
    property = "property123";
    hello: string;
    static v =1
    constructor(m: string) {
        this.hello = m;
    }
    @enumerable(false)
    paly(s: string) {
        console.log(s)
    }
}
var q = new GreeterFn1("world99")
// console.log();
q.paly('hei')
console.log('方法装饰器---------------');

// 参数装饰器
const requiredMetadataKey = Symbol("required");

function required(target: Object, propertyKey: string | symbol, parameterIndex: number, ...arg: any[]) {
   console.log(target, propertyKey, parameterIndex, arg)
}
class GreeterArg {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    greet(@required name: string) {
        return "Hello " + name + ", " + this.greeting;
    }
}
const v = new GreeterArg('2222')
console.log(v.greet('hello'), 'p-')