function currying (fc, ...args) {
    if(args.length >= fc.length) {
        fc(...args)
    }else {
        return (...args2) => currying(fc, ...args, ...args2)
    }
}   