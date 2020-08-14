Array.prototype.reduceToFilter = function (handler) {
    return this.reduce((target, current, index) => {
        if(handler.call(this, current, index)) {
            target.push(current)
        }
        return target;
    }, [])
}