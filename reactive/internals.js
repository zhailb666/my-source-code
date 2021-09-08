import { isFn, isCollectionType, isNormalType } from './checkers.js';
import { RawProxy, ProxyRaw, MakeObservableSymbol, RawShallowProxy, RawNode, } from './environment.js';
import { baseHandlers, collectionHandlers } from './handlers.js';
import { buildDataTree } from './datatree.js';
import { isSupportObservable } from './externals.js';
var createNormalProxy = function (target, shallow) {
    var proxy = new Proxy(target, baseHandlers);
    ProxyRaw.set(proxy, target);
    if (shallow) {
        RawShallowProxy.set(target, proxy);
    }
    else {
        RawProxy.set(target, proxy);
    }
    return proxy;
};
var createCollectionProxy = function (target, shallow) {
    var proxy = new Proxy(target, collectionHandlers);
    ProxyRaw.set(proxy, target);
    if (shallow) {
        RawShallowProxy.set(target, proxy);
    }
    else {
        RawProxy.set(target, proxy);
    }
    return proxy;
};
var createShallowProxy = function (target) {
    if (isNormalType(target))
        return createNormalProxy(target, true);
    if (isCollectionType(target))
        return createCollectionProxy(target, true);
    return target;
};
export var createObservable = function (target, key, value, shallow) {
    if (typeof value !== 'object')
        return value;
    var raw = ProxyRaw.get(value);
    if (!!raw) {
        var node = RawNode.get(raw);
        node.key = key;
        return value;
    }
    if (!isSupportObservable(value))
        return value;
    if (target) {
        var parentRaw = ProxyRaw.get(target) || target;
        var isShallowParent = RawShallowProxy.get(parentRaw);
        if (isShallowParent)
            return value;
    }
    buildDataTree(target, key, value);
    if (shallow)
        return createShallowProxy(value);
    if (isNormalType(value))
        return createNormalProxy(value);
    if (isCollectionType(value))
        return createCollectionProxy(value);
    return value;
};
export var createAnnotation = function (maker) {
    var annotation = function (target) {
        return maker({ value: target });
    };
    if (isFn(maker)) {
        annotation[MakeObservableSymbol] = maker;
    }
    return annotation;
};
export var getObservableMaker = function (target) {
    if (target[MakeObservableSymbol]) {
        if (!target[MakeObservableSymbol][MakeObservableSymbol]) {
            return target[MakeObservableSymbol];
        }
        return getObservableMaker(target[MakeObservableSymbol]);
    }
};
export var createBoundaryFunction = function (start, end) {
    function boundary(fn) {
        var results;
        start();
        try {
            if (isFn(fn)) {
                results = fn();
            }
        }
        finally {
            end();
            return results;
        }
    }
    boundary.bound = createBindFunction(boundary);
    return boundary;
};
export var createBindFunction = function (boundary) {
    function bind(callback, context) {
        return (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return boundary(function () { return callback.apply(context, args); });
        });
    }
    return bind;
};
export var createBoundaryAnnotation = function (start, end) {
    var boundary = createBoundaryFunction(start, end);
    var annotation = createAnnotation(function (_a) {
        var target = _a.target, key = _a.key;
        target[key] = boundary.bound(target[key], target);
        return target;
    });
    boundary[MakeObservableSymbol] = annotation;
    boundary.bound[MakeObservableSymbol] = annotation;
    return boundary;
};
//# sourceMappingURL=internals.js.map