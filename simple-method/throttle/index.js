const throttle = (fun, time) => {
    let timer = null;
    return (...args) => {
        if(timer) return;
        timer = setTimeout(() => {
            fun.apply(this, args)
            clearTimeout(timer)
            timer = null
        }, time || 1000);
    }
}

// 注：clearTimeout(timer) 后 timer值并不为null得手动重置下；