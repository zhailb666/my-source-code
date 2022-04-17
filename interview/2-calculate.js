/*
 * @Author: your name
 * @Date: 2022-04-17 18:40:58
 * @Description: file content
 */
let a = {
  i: 1,
  valueOf() {
    console.log('valueOf')
    return this.i++
  },
  toString() {
     console.log('toString')
    return this.i++
  },
  [Symbol.toPrimitive]() {
     console.log('Symbol.toPrimitive')
   return this.i++
  }
}

if (a == 1 && a == 2 && a == 3) {
  console.log('前端胖头鱼-a') // 前端胖头鱼
}

// 优先级
// Symbol.toPrimitive > valueOf > toString


let b = new Proxy({i: 0}, {
  get: function(target) {
    console.log(target, 'target')
    return () => {
       console.log(target.i, 'target.i')
      return ++target.i
    }
  }
})


if (b == 1 && b == 2 && b == 3) {
  console.log('前端胖头鱼-b') // 前端胖头鱼
}

let _c = 1
Object.defineProperty(this, 'c', {
  get() {
    return _c++
  }
})

if (this.c == 1 && this.c == 2 && this.c == 3) {
  console.log('前端胖头鱼_c') // 前端胖头鱼
}