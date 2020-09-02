(function(window){
    const PENDING = 'onpending'
    const REJECTED = 'onrejected'
    const RESOLVED = 'onresolved'
    
    class SynPromise {
        static resolve = (value) => {
            return new SynPromise((resolve, reject) => {
                if(value instanceof SynPromise) {
                    return value.then(resolve, reject)
                }
                resolve(value)
            })
        }

        static reject = (value) => {
            return new SynPromise((resolve, reject) => {
                if(value instanceof SynPromise) {
                    return value.then(resolve, reject)
                }
                reject(value)
            })
        }

        static all = (promises) => {
            const len = promises.length;
            const values = [];
            let resolveTime = 0
            return new SynPromise((resolve, reject) => {
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
            return new SynPromise((resolve, reject) => {
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
                this.callbacks.length && this.callbacks.forEach((ele) => {
                    const { onRejected }  = ele;
                    onRejected(reason)
                })
            }
    
            const resolve = (value) => {
                if(this.status !== PENDING) return;
                this.status = RESOLVED;
                // console.log(this, 'resolve')
                this.data = value;
                this.callbacks.length && this.callbacks.forEach((ele) => {
                    const { onResolved }  = ele;
                    onResolved(value)
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
            onResolve = typeof onResolve === 'function' ? onResolve : (value) => SynPromise.resolve(value);
            onReject = typeof onReject === 'function' ? onReject : (value) => SynPromise.reject(value);
    
            return new SynPromise((resolve, reject) => {
                function handle(callback) {
                    try {
                        const result = callback(self.data) 
                        if(result instanceof SynPromise) {
                             return result.then(resolve, reject)
                        } else {
                            resolve(result)
                        }
                     } catch (error) {
                         reject(error)
                     }
                }
    
                if(self.status === RESOLVED) {
                    handle(onResolve)
                } else if( self.status === REJECTED) {
                    handle(onReject)
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
                return SynPromise.resolve(callback()).then(() => data)
            })
        }

        catch(callback){
            return this.then(null, callback)
        }
    }
    window.SynPromise = SynPromise;
})(window)

// promise then为啥要用微任务；？？？ 如果同步的话是啥情况