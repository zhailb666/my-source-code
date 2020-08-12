
function forEach(array, callback) {
    let index = -1;
    const len = array.length;
    while( ++index < len) {
        callback(array[index], index)
    }
    return array;
}

var v2deepclone = (target, map = new WeakMap()) => {
    if( typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};

        if(map.get(target)) {
            return map.get(target)
        }
        map.set(target, cloneTarget)
        
        const keys = Array.isArray(target) ? undefined : Object.keys(target)

        forEach(keys || target, (ele, index) => {
            cloneTarget[ele] = v2deepclone(target[ele], map)
        })

        return cloneTarget;
    }
    return target
}

/**
 * 1、引入weapMap 解决了循环引入问题；
 * 2、自己用while 封装一个函数forEach 提高了循环性能；性能对比  while > for循环 > for in
 */