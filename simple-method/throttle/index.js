const throttle = (fun, time = 1000) => {
    let timer = null;
    return (...args) => {
        if(timer) return;
        timer = setTimeout(() => {
            fun.apply(this, args)
            clearTimeout(timer)
        }, time);
    }
}