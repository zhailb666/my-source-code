Array.prototype.reduceToMap = function (handler) {
    return this.reduce((target, current, index) => {
        target.push(handler.call(this, current, index))
        return target;
    }, [])
}