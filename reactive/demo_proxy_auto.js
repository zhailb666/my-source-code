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
export var RawProxy1 = new WeakMap();
export var ReactionStack1 = []
export var PendingReactions1 = new Set();
export var BatchCount1 = { value: 0 };
export var RawReactionsMap1 = new WeakMap();

var wellKnownSymbols = new Set(Object.getOwnPropertyNames(Symbol)
    .map(function (key) { return Symbol[key]; })
    .filter(function (value) { return typeof value === 'symbol'; }));

var addReactionsMapToReaction1 = function (reaction, reactionsMap) {
    var bindSet = reaction._reactionsSet;
    if (bindSet) {
        bindSet.add(reactionsMap);
    }
    else {
        reaction._reactionsSet = new Set([reactionsMap]);
    }
    return bindSet;
};

// target, key 与 reaction 建立联系
var addRawReactionsMap = function (target, key, reaction) {
    var reactionsMap = RawReactionsMap1.get(target);
    if (reactionsMap) {
        var reactions = reactionsMap.get(key);
        if (reactions) {
            reactions.add(reaction);
        }
        else {
            reactionsMap.set(key, new Set([reaction]));
        }
        return reactionsMap;
    }
    else {
        var reactionsMap_1 = new Map([[key, new Set([reaction])]]);
        RawReactionsMap1.set(target, reactionsMap_1);
        return reactionsMap_1;
    }
};

export var bindTargetKeyWithCurrentReaction = function (operation) {
    var key = operation.key, type = operation.type, target = operation.target;
    if (type === 'iterate') {
        key = ITERATION_KEY;
    }
    var current = ReactionStack1[ReactionStack1.length - 1];

    if (current) {
        addReactionsMapToReaction1(current, addRawReactionsMap(target, key, current));
    }
};

var getReactionsFromTargetKey = function (target, key) {
    var reactionsMap = RawReactionsMap1.get(target);
    var reactions = [];
    if (reactionsMap) {
        var map = reactionsMap.get(key);
        if (map) {
            map.forEach(function (reaction) {
                if (reactions.indexOf(reaction) === -1) {
                    reactions.push(reaction);
                }
            });
        }
    }
    return reactions;
};

var runReactions = function (target, key) {
    var reactions = getReactionsFromTargetKey(target, key);
    for (var i = 0, len = reactions.length; i < len; i++) {
        var reaction = reactions[i];
        if (false && isBatching()) {
            PendingReactions1.add(reaction);
        } else {
            reaction();
        }
       
    }
};

export var runReactionsFromTargetKey = function (operation) {
    var key = operation.key, type = operation.type, target = operation.target, oldTarget = operation.oldTarget;
    // notifyObservers(operation);
    runReactions(target, key);
};

var obr = (obj) => {
    var proxy = new Proxy(obj, {
         get: function (target, key, receiver) {
             console.log(target, key, target[key], receiver, 'when-get-')
            var result = target[key]; // use Reflect.get is too slow
            if (typeof key === 'symbol' && wellKnownSymbols.has(key)) {
                return result;
            }
            bindTargetKeyWithCurrentReaction({ target: target, key: key, receiver: receiver, type: 'get' });
            var observableResult = RawProxy1.get(result);  
            if (observableResult) {
                return observableResult;
            }
            if(!observableResult && typeof result === 'object') {
                return obr(result) // 如果不做这个proxy只会对第一层数据的属性代理有效, 如果不返回obr 也是有问题的
            }
            return result;
         },
         set: function (target, key, value, receiver) { 
             console.log(target, key, value, receiver, 'when-set-')
             var oldValue = target[key]
             console.log(oldValue, 'oldValue=-=-=-=')
             target[key] = value
             runReactionsFromTargetKey({ target: target, key: key, value: value, oldValue: oldValue, type: 'set' });
             return true
         }
    })
    RawProxy1.set(obj, proxy);
    return proxy
}

export var executePendingReactionsSelf = function () {
    PendingReactions1.forEach(function (reaction) {
        PendingReactions1.delete(reaction);
        reaction();
    });
};

export var batchStart1 = function () {
    BatchCount1.value++;
};

export var batchEnd1 = function () {
    BatchCount1.value--;
    if (BatchCount1.value === 0) {
        executePendingReactionsSelf();
    }
};

export var autorunSelf = function (tracker) {
    var reaction = function () {
        if (typeof tracker !== 'function')
            return;
        if (ReactionStack1.indexOf(reaction) === -1) {
            try {
                batchStart1();
                ReactionStack1.push(reaction);
                tracker();
            }
            finally {
                ReactionStack1.pop();
                batchEnd1();
            }
        }
    };
    reaction();
    return function () {
        // disposeBindingReactions(reaction);
    };
};



var b = {
    aa: { bb: 123}, // 当执行bb的时候是不走set的proxy无效了
    cc: {dd: 123 },
}

var a1 = obr(b)

 autorunSelf(() => {
    // 首次的时候会触发，变化的时候也会触发
    // 总共触发2次
    console.log('autorunSelf', a1.aa.bb)
})
console.log(a1.aa.bb, 'a1.aa.bb')
// console.log(a1.aa.bb, 'a1.aa.bb')


a1.aa.bb = 3
a1.aa.bb = 6
// console.log(a1.aa.bb, 'a1.aa.bb')

console.log('demo_proxy_auto------------------------end')