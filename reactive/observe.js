/*
 * @Author: your name
 * @Date: 2021-09-08 22:04:34
 * @Description: file content
 */
import { RawNode, ProxyRaw, ObserverListeners } from './environment.js';
import { isFn } from './checkers.js';
import { DataChange } from './datatree.js';
export var observe = function (target, observer, deep) {
    if (deep === void 0) { deep = true; }
    var addListener = function (target) {
        var raw = ProxyRaw.get(target) || target;
        var node = RawNode.get(raw);
        var listener = function (operation) {
            var targetRaw = ProxyRaw.get(operation.target) || operation.target;
            var targetNode = RawNode.get(targetRaw);
            if (deep) {
                if (node.contains(targetNode)) {
                    observer(new DataChange(operation, targetNode));
                    return;
                }
            }
            if (node === targetNode ||
                (node.targetRaw === targetRaw && node.key === operation.key)) {
                observer(new DataChange(operation, targetNode));
            }
        };
        if (node && isFn(observer)) {
            ObserverListeners.add(listener);
        }
        return function () {
            ObserverListeners.delete(listener);
        };
    };
    if (target && typeof target !== 'object')
        throw Error("Can not observe " + typeof target + " type.");
    return addListener(target);
};
//# sourceMappingURL=observe.js.map