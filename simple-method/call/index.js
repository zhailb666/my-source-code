Function.prototype.myCall = function(context = window, ...args) {
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