export var concat = function (array, target) {
    var arr = [];
    for (var i = 0; i < array.length; i++) {
        arr.push(array[i]);
    }
    arr.push(target);
    return arr;
};
export var toArray = function (value) {
    return Array.isArray(value)
        ? value
        : value !== undefined && value !== null
            ? [value]
            : [];
};
//# sourceMappingURL=array.js.map