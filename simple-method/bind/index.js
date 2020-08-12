Function.prototype.myBind = function(context = window, ...args) {
    const _this = this;
    return function(...targs) {
        return _this.apply(context, args.concat(targs))
    }
}