/*
 * @Author: your name
 * @Date: 2021-09-21 18:15:30
 * @Description: file content
 */
//    return new Proxy(result, {
//       get: function (target, key, receiver) { 
//           console.log(target, key, 'target, key===哈哈---')
//           return target[key]
//       }
//    })
import { RawNode1, buildDataTreeNew } from './demo_dataTree.js';
export var RawProxy1 = new WeakMap();
export var ProxyRaw1 = new WeakMap();
export var ObserverListeners1 = new Set();


var notifyObservers1 = function (operation) {
    ObserverListeners1.forEach(function (fn) { return fn(operation); });
};


var wellKnownSymbols = new Set(Object.getOwnPropertyNames(Symbol)
    .map(function (key) { return Symbol[key]; })
    .filter(function (value) { return typeof value === 'symbol'; }));

var obr = (obj, target, key) => {
    buildDataTreeNew(obj, target, key)
    var proxy = new Proxy(obj, {
         get: function (target, key, receiver) {
            //  console.log(target, key, target[key], receiver, 'when-get-')
            var result = target[key]; // use Reflect.get is too slow
            if (typeof key === 'symbol' && wellKnownSymbols.has(key)) {
                return result;
            }
            var observableResult = RawProxy1.get(result);  
            if (observableResult) {
                return observableResult;
            }
            if(!observableResult && typeof result === 'object') {
                // console.log('执行次数')
                return obr(result, target, key) // 如果不做这个proxy只会对第一层数据的属性代理有效, 如果不返回obr 也是有问题的
            }
            return result;
         },
         set: function (target, key, value, receiver) { 
            //  console.log(target, key, value, receiver, 'when-set-')
             var oldValue = target[key]
            //  console.log(oldValue, 'oldValue=-=-=-=')
             target[key] = value
             notifyObservers1({ target: target, key: key, value: value, oldValue: oldValue, type: 'set' })
             return true
         }
    })
    RawProxy1.set(obj, proxy);
    ProxyRaw1.set(proxy, obj);
    return proxy
}

export var observeSelf = function (target, observer, deep) {
    if (deep === void 0) { deep = true; }
    var addListener = function (target) {
        var raw = ProxyRaw1.get(target) || target;
        var node = RawNode1.get(raw);
        var listener = function (operation) {
            var targetRaw = ProxyRaw1.get(operation.target) || operation.target;
            var targetNode = RawNode1.get(targetRaw);
            if (deep) {
                if (node.contains(targetNode)) {
                    // console.log({operation, targetNode}, '{operation, targetNode}=-=')
                    observer({operation, targetNode});
                    return;
                }
            }
        };
        if (node && typeof observer === 'function') {
            ObserverListeners1.add(listener);
        }
        return function () {
            ObserverListeners1.delete(listener);
        };
    };
    if (target && typeof target !== 'object')
        throw Error("Can not observe " + typeof target + " type.");
    return addListener(target);
};



var b = {
    aa: { bb: 123}, // 当执行bb的时候是不走set的proxy无效了
    cc: {dd: 123 },
}

var a1 = obr(b)

observeSelf(a1, (change) => {
    console.log('数据改变的时候做', change)
})

a1.aa.bb = 3
a1.aa.bb = 6

console.log('demo_proxy_observe------------------------end')