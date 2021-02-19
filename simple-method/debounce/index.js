/*
 * @Author: your name
 * @Date: 2020-08-12 17:22:01
 * @Description: file content
 */
const debounce = (fun, time = 1000) => {
    let timer = null;
    return (...args) => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fun.apply(this, args)
            clearTimeout(timer)
        }, time);
    }
}


