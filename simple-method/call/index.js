Function.prototype.myCall = function(context = window, ...args) {
    if(this === Function.prototype) {
        debugger
        throw new Error('不能直接调用')
    }
    const fn = Symbol()
    context[fn] = this;


    let result = null
    if(Array.isArray(args)) {
        result = context[fn](...args)
    } else {
        result = context[fn]()
    }
    delete context[fn]

    return result
}