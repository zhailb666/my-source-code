/*
 * @Author: your name
 * @Date: 2021-09-21 18:15:30
 * @Description: file content
 */
var RawNode1 = new WeakMap();

function DataNode(target, key, value) {
        this.target = target;
        this.key = key;
        this.value = value;
    }
Object.defineProperty(DataNode.prototype, "path", {
    get: function () {
        if (!this.parent)
            return this.key ? [this.key] : [];
        // return concat(this.parent.path, this.key);
        return this.parent.path.concat(this.key);
    },
    enumerable: false,
    configurable: true
});
Object.defineProperty(DataNode.prototype, "targetRaw", {
    get: function () {
        return this.target;
    },
    enumerable: false,
    configurable: true
});
// Object.defineProperty(DataNode.prototype, "targetRaw", {
//         get: function () {
//             return ProxyRaw.get(this.target) || this.target;
//         },
//         enumerable: false,
//         configurable: true
// });
Object.defineProperty(DataNode.prototype, "parent", {
    get: function () {
        if (!this.target)
            return;
        return RawNode1.get(this.targetRaw);
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
        console.log(parent, 'parent-=-=')
        if (this.isEqual(parent))
            return true;
        parent = parent.parent;
    }
    return false;
};

function buildDataTree(target, key, value) {
   const d =  new DataNode(target, key, value)
   console.log(value, 'value--key')
   RawNode1.set(value, d)
}

function buildDataTreeAll(obj) {
    buildDataTree(null, null, obj)

    function _all (target) {
        Object.keys(target).forEach(key => {
            const result = target[key]
            if(typeof result === 'object') {
               _all(result)
                buildDataTree(target, key, result)
            } 
        })
    }
    _all(obj)
    console.log(RawNode1)
}

var b = {
    aa: { bb: 123 }, // 当执行bb的时候是不走set的proxy无效了
    cc: { dd: { ee: 456 } },
}

buildDataTreeAll(b)
console.log(RawNode1.get(b.cc.dd).path)
console.log(RawNode1.get(b).contains(RawNode1.get(b.cc.dd))) 
console.log('demo_dataTree------------------------end')



