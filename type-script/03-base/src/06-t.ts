/*
 * @Author: your name
 * @Date: 2022-03-05 22:49:03
 * @Description: 泛型
 */

// 泛型在方法中的使用
interface GenericIdentityFn {
    <T>(arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn = identity;

identity<number>(9)
myIdentity<string>('22')

// 泛型在类中的使用
function create<T>(c: { new(...restOfName: any[]): T }, v: string): T {
    return new c(v);
}

class Cc{
   public name=1
    constructor(name: number) {
        this.name = name
    }
}

create<Cc>(Cc,'11')

// 泛型的最佳实践 mongodb

