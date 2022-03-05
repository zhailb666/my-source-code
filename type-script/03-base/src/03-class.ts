/*
 * @Author: your name
 * @Date: 2022-03-05 15:39:43
 * @Description: file content
 */

// 1、静态属性 & 继承
class Animate {
  static st = '444'
  private p = '3'
  type = 'dog'
}

console.log(Animate.st)

class DaHuang extends Animate {
    type = 'daHuang'
    bark() {
        console.log('Woof! Woof!');
    }
}

// 2、公共，私有与受保护的修饰符
class Animate2 {
   public type = 'dog'
   protected p = 'p'
   private prt = 'prt'
}

class DaHuang2 extends Animate2 {
    type = 'daHuang'
    bark() {
      console.log(this.p) // info: protected成员在派生类中仍然可以访问
      // console.log(this.prt) error: private 不能被继承类访问
      console.log('Woof! Woof!');
    }
}

const d2 = new DaHuang2()
console.log(d2.type)
// console.log(d2.p)  error protected 不能被实例访问
// console.log(d2.prt) error private 不能被实例访问


// 3、存取器 get 与 set
let passade = "secret passcode";

class Employee {
    private _fullName: string;
    constructor(na: string) {
      this._fullName = na
    }
    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passade && passade == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee('999');
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}

// 4、抽象类 info: 不同于接口，抽象类可以包含成员的实现细节
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log('roaming the earch...');
    }
}

class AccountingDepartment extends Animal {
  makeSound(): void {
    console.log('makeSoundFun')
  }
}

const account = new AccountingDepartment()
account.makeSound()
account.move()