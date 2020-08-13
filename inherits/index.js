
function inherits (target, parent) {
    target.super_ = parent;
    target.prototype = Object.create(parent.prototype, {
        constructor: {
            value: target,
            enumerable: false,
            writable: true,
            configurable: true
        }
    })
}
