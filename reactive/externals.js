import { isValid, isFn, isMap, isWeakMap, isSet, isWeakSet, isPlainObj, isArr, } from './checkers.js';
import { ProxyRaw, MakeObservableSymbol } from './environment.js';
var RAW_TYPE = Symbol('RAW_TYPE');
var OBSERVABLE_TYPE = Symbol('OBSERVABLE_TYPE');
var hasOwnProperty = Object.prototype.hasOwnProperty;
export var isObservable = function (target) {
    return ProxyRaw.has(target);
};
export var isAnnotation = function (target) {
    return target && !!target[MakeObservableSymbol];
};
export var isSupportObservable = function (target) {
    if (!isValid(target))
        return false;
    if (isArr(target))
        return true;
    if (isPlainObj(target)) {
        if (target[RAW_TYPE]) {
            return false;
        }
        if (target[OBSERVABLE_TYPE]) {
            return true;
        }
        if ('$$typeof' in target && '_owner' in target) {
            return false;
        }
        if (target['_isAMomentObject']) {
            return false;
        }
        if (target['_isJSONSchemaObject']) {
            return false;
        }
        if (isFn(target['toJS'])) {
            return false;
        }
        if (isFn(target['toJSON'])) {
            return false;
        }
        return true;
    }
    if (isMap(target) || isWeakMap(target) || isSet(target) || isWeakSet(target))
        return true;
    return false;
};
export var markRaw = function (target) {
    if (!target)
        return;
    if (isFn(target)) {
        target.prototype[RAW_TYPE] = true;
    }
    else {
        target[RAW_TYPE] = true;
    }
    return target;
};
export var markObservable = function (target) {
    if (!target)
        return;
    if (isFn(target)) {
        target.prototype[OBSERVABLE_TYPE] = true;
    }
    else {
        target[OBSERVABLE_TYPE] = true;
    }
    return target;
};
export var raw = function (target) { return ProxyRaw.get(target); };
export var toJS = function (values) {
    var visited = new WeakSet();
    var tojs = function (values) {
        if (isArr(values)) {
            if (visited.has(values)) {
                return values;
            }
            var originValues = values;
            if (ProxyRaw.has(values)) {
                values = ProxyRaw.get(values);
            }
            visited.add(originValues);
            var res_1 = [];
            values.forEach(function (item) {
                res_1.push(tojs(item));
            });
            return res_1;
        }
        else if (isPlainObj(values)) {
            if (visited.has(values)) {
                return values;
            }
            var originValues = values;
            if (ProxyRaw.has(values)) {
                values = ProxyRaw.get(values);
            }
            if ('$$typeof' in values && '_owner' in values) {
                return values;
            }
            else if (values['_isAMomentObject']) {
                return values;
            }
            else if (values['_isJSONSchemaObject']) {
                return values;
            }
            else if (isFn(values['toJS'])) {
                return values['toJS']();
            }
            else if (isFn(values['toJSON'])) {
                return values['toJSON']();
            }
            else {
                visited.add(originValues);
                var res = {};
                for (var key in values) {
                    if (hasOwnProperty.call(values, key)) {
                        res[key] = tojs(values[key]);
                    }
                }
                return res;
            }
        }
        else {
            return values;
        }
    };
    return tojs(values);
};
//# sourceMappingURL=externals.js.map