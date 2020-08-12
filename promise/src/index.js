(function(window){
    const PENDING = 'onpending'
    const REJECTED = 'onrejected'
    const RESOLVED = 'onresolved'
    
    class MyPromise {
        static resolve = (value) => {
            return new MyPromise((resolve, reject) => {
                if(value instanceof MyPromise) {
                    return value.then(resolve, reject)
                }
                resolve(value)
            })
        }

        static reject = (value) => {
            return new MyPromise((resolve, reject) => {
                if(value instanceof MyPromise) {
                    return value.then(resolve, reject)
                }
                reject(value)
            })
        }

        static all = (promises) => {
            const len = promises.length;
            const values = [];
            let resolveTime = 0
            return new MyPromise((resolve, reject) => {
                promises.forEach((p, index) => {
                    p.then((value) => {
                        resolveTime++
                        values[index] = value;

                        if(resolveTime === len) {
                            resolve(values)
                        }

                    },(reason) => {
                        reject(reason)
                    })
                })
            })
        }
        
        static race = (promises) => { // 第一个成功就成功失败就失败
            return new MyPromise((resolve, reject) => {
                promises.forEach((p, index) => {
                    p.then((value) => {
                        resolve(value)
                    },(reason) => {
                        reject(reason)
                    })
                })
            })
        }
    
        constructor(executer) {
            this.status = PENDING
            this.callbacks = []
            this.data = ''
            const reject = (reason) => {
                if(this.status !== PENDING) return;
                this.status = REJECTED;
                this.data = reason;
                this.callbacks.length && setTimeout(() => {
                    this.callbacks.forEach((ele) => {
                        const { onRejected }  = ele;
                        onRejected(reason)
                    })
                })
            }
    
            const resolve = (value) => {
                if(this.status !== PENDING) return;
                this.status = RESOLVED;
                // console.log(this, 'resolve')
                this.data = value;
                this.callbacks.length && setTimeout(() => {
                     this.callbacks.forEach((ele) => {
                        const { onResolved }  = ele;
                        onResolved(value)
                    })
                })
            }
    
            try {
                executer(resolve, reject) // 同步new Promise中的执行函数
            } catch (error) {
                reject(error)
            }
            
        }
    
        then(onResolve, onReject) {
            const self = this;
            // console.log(self, 'self')
            onResolve = typeof onResolve === 'function' ? onResolve : (value) => MyPromise.resolve(value);
            onReject = typeof onReject === 'function' ? onReject : (value) => MyPromise.reject(value);
    
            return new MyPromise((resolve, reject) => {
                function handle(callback) {
                    try {
                        const result = callback(self.data) 
                        if(result instanceof Promise) {
                             return result.then(resolve, reject)
                        } else {
                            resolve(result)
                        }
                     } catch (error) {
                         reject(error)
                     }
                }
    
                if(self.status === RESOLVED) {
                    setTimeout(() => {
                        handle(onResolve)
                    })
                } else if( self.status === REJECTED) {
                    setTimeout(() => {
                        handle(onReject)
                    })
                } else {
                    self.callbacks.push({
                        onResolved() {
                            handle(onResolve)
                        },
                        onRejected() {
                            handle(onReject)
                        }
                    })
                }
            })
        }

        finally(callback){
            return this.then((data) => {
                return Promise.resolve(callback()).then(() => data)
            })
        }

        catch(callback){
            return this.then(null, callback)
        }
    }
    window.MyPromise = MyPromise;
})(window)

// 1: * 如何改变promise状态，* 一个promise指定多个成功/失败的回调函数的都会调用吗？
// 2: * 改变promise状态和指定回调函数谁先谁后
// -1）都有可能, 情况一：先改状态； 情况二：先指定回调函数；
// -2）如何先改变状态再指定回调（情况一：在执行函数中直接调用resolve()/reject(); 情况二：延迟更长时间才调用then() ）
// -3）啥时候才能得到数据 (情况一：当指定回调函数时，回调函数就会调用，得到数据； 情况二：当状态发生改变时，回调函数就会调用，得到数据)
// 3: * 先执行then，还是先改变状态；
// 4: * 链式调用；
// 5: * 异常穿透， * 中断promise链；