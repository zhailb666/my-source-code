export var isMap = function (val) {
    return val && val instanceof Map;
};
export var isSet = function (val) { return val && val instanceof Set; };
export var isWeakMap = function (val) {
    return val && val instanceof WeakMap;
};
export var isWeakSet = function (val) {
    return val && val instanceof WeakSet;
};
export var isFn = function (val) { return typeof val === 'function'; };
export var isArr = Array.isArray;
export var isPlainObj = function (val) {
    return Object.prototype.toString.call(val) === '[object Object]';
};
export var isValid = function (val) { return val !== null && val !== undefined; };
export var isCollectionType = function (target) {
    return (isMap(target) || isWeakMap(target) || isSet(target) || isWeakSet(target));
};
export var isNormalType = function (target) {
    return isPlainObj(target) || isArr(target);
};
//# sourceMappingURL=checkers.js.map