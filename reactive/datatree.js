/*
 * @Author: your name
 * @Date: 2021-09-08 21:30:15
 * @Description: file content
 */
import { ProxyRaw, RawNode } from './environment.js';
import { concat } from './array.js';
var DataChange = /** @class */ (function () {
    function DataChange(operation, node) {
        this.key = operation.key;
        this.type = operation.type;
        this.value = operation.value;
        this.oldValue = operation.oldValue;
        this.path = concat(node.path, operation.key);
    }
    return DataChange;
}());
export { DataChange };
var DataNode = /** @class */ (function () {
    function DataNode(target, key, value) {
        this.target = target;
        this.key = key;
        this.value = value;
    }
    Object.defineProperty(DataNode.prototype, "path", {
        get: function () {
            if (!this.parent)
                return this.key ? [this.key] : [];
            return concat(this.parent.path, this.key);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataNode.prototype, "targetRaw", {
        get: function () {
            return ProxyRaw.get(this.target) || this.target;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataNode.prototype, "parent", {
        get: function () {
            if (!this.target)
                return;
            return RawNode.get(this.targetRaw);
        },
        enumerable: false,
        configurable: true
    });
    DataNode.prototype.isEqual = function (node) {
        if (this.key) {
            return node.targetRaw === this.targetRaw && node.key === this.key;
        }
        return node.value === this.value;
    };
    DataNode.prototype.contains = function (node) {
        if (node === this)
            return true;
        var parent = node.parent;
        while (!!parent) {
            if (this.isEqual(parent))
                return true;
            parent = parent.parent;
        }
        return false;
    };
    return DataNode;
}());
export { DataNode };
export var buildDataTree = function (target, key, value) {
    var currentNode = RawNode.get(ProxyRaw.get(value) || value);
    if (currentNode)
        return currentNode;
    RawNode.set(value, new DataNode(target, key, value));
};
//# sourceMappingURL=datatree.js.map