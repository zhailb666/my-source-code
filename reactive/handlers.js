var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var _a;
import { bindTargetKeyWithCurrentReaction, runReactionsFromTargetKey, } from './reaction.js';
import { ProxyRaw, RawProxy } from './environment.js';
import { isObservable, isSupportObservable } from './externals.js';
import { createObservable } from './internals.js';
var wellKnownSymbols = new Set(Object.getOwnPropertyNames(Symbol)
    .map(function (key) { return Symbol[key]; })
    .filter(function (value) { return typeof value === 'symbol'; }));
var hasOwnProperty = Object.prototype.hasOwnProperty;
function findObservable(target, key, value) {
    var observableObj = RawProxy.get(value);
    if (observableObj) {
        return observableObj;
    }
    if (!isObservable(value) && isSupportObservable(value)) {
        return createObservable(target, key, value);
    }
    return value;
}
function patchIterator(target, key, iterator, isEntries) {
    var originalNext = iterator.next;
    iterator.next = function () {
        var _a = originalNext.call(iterator), done = _a.done, value = _a.value;
        if (!done) {
            if (isEntries) {
                value[1] = findObservable(target, key, value[1]);
            }
            else {
                value = findObservable(target, key, value);
            }
        }
        return { done: done, value: value };
    };
    return iterator;
}
var instrumentations = (_a = {
        has: function (key) {
            var target = ProxyRaw.get(this);
            var proto = Reflect.getPrototypeOf(this);
            bindTargetKeyWithCurrentReaction({ target: target, key: key, type: 'has' });
            return proto.has.apply(target, arguments);
        },
        get: function (key) {
            var target = ProxyRaw.get(this);
            var proto = Reflect.getPrototypeOf(this);
            bindTargetKeyWithCurrentReaction({ target: target, key: key, type: 'get' });
            return findObservable(target, key, proto.get.apply(target, arguments));
        },
        add: function (key) {
            var target = ProxyRaw.get(this);
            var proto = Reflect.getPrototypeOf(this);
            var hadKey = proto.has.call(target, key);
            // forward the operation before queueing reactions
            var result = proto.add.apply(target, arguments);
            if (!hadKey) {
                runReactionsFromTargetKey({ target: target, key: key, value: key, type: 'add' });
            }
            return result;
        },
        set: function (key, value) {
            var target = ProxyRaw.get(this);
            var proto = Reflect.getPrototypeOf(this);
            var hadKey = proto.has.call(target, key);
            var oldValue = proto.get.call(target, key);
            // forward the operation before queueing reactions
            var result = proto.set.apply(target, arguments);
            if (!hadKey) {
                runReactionsFromTargetKey({ target: target, key: key, value: value, type: 'add' });
            }
            else if (value !== oldValue) {
                console.log({ target: target, key: key, value: value, oldValue: oldValue, type: 'set' }, 'when-set-diff')
                runReactionsFromTargetKey({ target: target, key: key, value: value, oldValue: oldValue, type: 'set' });
            }
            return result;
        },
        delete: function (key) {
            var target = ProxyRaw.get(this);
            var proto = Reflect.getPrototypeOf(this);
            var hadKey = proto.has.call(target, key);
            var oldValue = proto.get ? proto.get.call(target, key) : undefined;
            // forward the operation before queueing reactions
            var result = proto.delete.apply(target, arguments);
            if (hadKey) {
                runReactionsFromTargetKey({ target: target, key: key, oldValue: oldValue, type: 'delete' });
            }
            return result;
        },
        clear: function () {
            var target = ProxyRaw.get(this);
            var proto = Reflect.getPrototypeOf(this);
            var hadItems = target.size !== 0;
            var oldTarget = target instanceof Map ? new Map(target) : new Set(target);
            // forward the operation before queueing reactions
            var result = proto.clear.apply(target, arguments);
            if (hadItems) {
                runReactionsFromTargetKey({ target: target, oldTarget: oldTarget, type: 'clear' });
            }
            return result;
        },
        forEach: function (cb) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var target = ProxyRaw.get(this);
            var proto = Reflect.getPrototypeOf(this);
            bindTargetKeyWithCurrentReaction({ target: target, type: 'iterate' });
            // swap out the raw values with their observable pairs
            // before passing them to the callback
            var wrappedCb = function (value, key) {
                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    args[_i - 2] = arguments[_i];
                }
                return cb.apply(void 0, __spread([findObservable(target, key, value), key], args));
            };
            return (_a = proto.forEach).call.apply(_a, __spread([target, wrappedCb], args));
        },
        keys: function () {
            var target = ProxyRaw.get(this);
            var proto = Reflect.getPrototypeOf(this);
            bindTargetKeyWithCurrentReaction({ target: target, type: 'iterate' });
            return proto.keys.apply(target, arguments);
        },
        values: function () {
            var target = ProxyRaw.get(this);
            var proto = Reflect.getPrototypeOf(this);
            bindTargetKeyWithCurrentReaction({ target: target, type: 'iterate' });
            var iterator = proto.values.apply(target, arguments);
            return patchIterator(target, '', iterator, false);
        },
        entries: function () {
            var target = ProxyRaw.get(this);
            var proto = Reflect.getPrototypeOf(this);
            bindTargetKeyWithCurrentReaction({ target: target, type: 'iterate' });
            var iterator = proto.entries.apply(target, arguments);
            return patchIterator(target, '', iterator, true);
        }
    },
    _a[Symbol.iterator] = function () {
        var target = ProxyRaw.get(this);
        var proto = Reflect.getPrototypeOf(this);
        bindTargetKeyWithCurrentReaction({ target: target, type: 'iterate' });
        var iterator = proto[Symbol.iterator].apply(target, arguments);
        return patchIterator(target, '', iterator, target instanceof Map);
    },
    Object.defineProperty(_a, "size", {
        get: function () {
            var target = ProxyRaw.get(this);
            var proto = Reflect.getPrototypeOf(this);
            bindTargetKeyWithCurrentReaction({ target: target, type: 'iterate' });
            return Reflect.get(proto, 'size', target);
        },
        enumerable: false,
        configurable: true
    }),
    _a);
export var collectionHandlers = {
    get: function (target, key, receiver) {
        // instrument methods and property accessors to be reactive
        target = hasOwnProperty.call(instrumentations, key)
            ? instrumentations
            : target;
        return Reflect.get(target, key, receiver);
    },
};
export var baseHandlers = {
    get: function (target, key, receiver) {
        var result = target[key]; // use Reflect.get is too slow
        if (typeof key === 'symbol' && wellKnownSymbols.has(key)) {
            return result;
        }
        bindTargetKeyWithCurrentReaction({ target: target, key: key, receiver: receiver, type: 'get' });
        var observableResult = RawProxy.get(result);
        if (observableResult) {
            return observableResult;
        }
        // console.log(target, key, result, '----get')
        if (!isObservable(result) && isSupportObservable(result)) {
           
            var descriptor = Reflect.getOwnPropertyDescriptor(target, key);
            if (!descriptor ||
                !(descriptor.writable === false && descriptor.configurable === false)) {
                    // console.log(target, key, result, 'createObservable----get')
                return createObservable(target, key, result);
            }
        }
        return result;
    },
    has: function (target, key) {
        console.log('has')
        var result = Reflect.has(target, key);
        bindTargetKeyWithCurrentReaction({ target: target, key: key, type: 'has' });
        return result;
    },
    ownKeys: function (target) {
        console.log('ownKeys')
        bindTargetKeyWithCurrentReaction({ target: target, type: 'iterate' });
        return Reflect.ownKeys(target);
    },
    set: function (target, key, value, receiver) {
        var hadKey = hasOwnProperty.call(target, key);
        var newValue = createObservable(target, key, value);
        // console.log(target, newValue, 'newValue----')
        var oldValue = target[key];
        target[key] = newValue; // use Reflect.set is too slow
        if (!hadKey) {
            runReactionsFromTargetKey({
                target: target,
                key: key,
                value: newValue,
                oldValue: oldValue,
                receiver: receiver,
                type: 'add',
            });
        }
        else if (value !== oldValue) {
            // console.log({
            //     target: target,
            //     key: key,
            //     value: newValue,
            //     oldValue: oldValue,
            //     receiver: receiver,
            //     type: 'set',
            // }, 'set-when-diff')
            runReactionsFromTargetKey({
                target: target,
                key: key,
                value: newValue,
                oldValue: oldValue,
                receiver: receiver,
                type: 'set',
            });
        }
        return true;
    },
    deleteProperty: function (target, key) {
         console.log('deleteProperty')
        var res = Reflect.deleteProperty(target, key);
        var oldValue = target[key];
        runReactionsFromTargetKey({
            target: target,
            key: key,
            oldValue: oldValue,
            type: 'delete',
        });
        return res;
    },
};
//# sourceMappingURL=handlers.js.map