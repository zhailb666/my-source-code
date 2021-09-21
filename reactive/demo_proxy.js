/*
 * @Author: your name
 * @Date: 2021-09-21 18:15:30
 * @Description: file content
 */
export var RawProxy1 = new WeakMap();

var wellKnownSymbols = new Set(Object.getOwnPropertyNames(Symbol)
    .map(function (key) { return Symbol[key]; })
    .filter(function (value) { return typeof value === 'symbol'; }));

var obr = (obj) => {
    var proxy = new Proxy(obj, {
         get: function (target, key, receiver) {
             console.log(target, key, target[key], receiver, 'when-get-')
            var result = target[key]; // use Reflect.get is too slow
            if (typeof key === 'symbol' && wellKnownSymbols.has(key)) {
                return result;
            }
            var observableResult = RawProxy1.get(result);  
            if (observableResult) {
                return observableResult;
            }
            if(!observableResult && typeof result === 'object') {
                obr(result) // 如果不做这个proxy只会对第一层数据的属性代理有效
            }
            return result;
         },
         set: function (target, key, value, receiver) { 
             console.log(target, key, value, receiver, 'when-set-')
             target[key] = value
             return true
         }
    })
    RawProxy1.set(obj, proxy);
    return proxy
}

var b = {
    aa: { bb: 123}, // 当执行bb的时候是不走set的proxy无效了
    cc: {dd: 123 },
}

var a1 = obr(b)
console.log(a1.aa.bb, 'a1.aa.bb')
console.log(a1.aa.bb, 'a1.aa.bb')


// a1.aa.bb = 4
// console.log(a1.aa.bb, 'a1.aa.bb')

// console.log('demo_proxy_end')