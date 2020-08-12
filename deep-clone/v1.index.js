var v1deepclone = (target) => {
    if( typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        for(let key in target) {
            cloneTarget[key] = v1deepclone(target[key])
        }
    }
    return target
}

// 存在的问题循环引用问题 
/**

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8]
};
target.target = target;

v1deepclone(target)

 * 
 */