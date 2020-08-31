
var PubSubInstance = getPubSubInstance();


// 重写history.pushState方法首先先缓存之前的方法
var addHistoryMethod = (function(){
    return function(name) {
        var method = history[name]; // 缓存了history.pushState***
        return function(...args){
            console.log('arguments', arguments);
            console.log('args', args);
            method.apply(history, arguments);
            PubSubInstance.publish('historyChange')
        }
    }
}())

history.pushState =  addHistoryMethod('pushState');

history.replaceState =  addHistoryMethod('replaceState');

PubSubInstance.subscribe('historyChange', function(e) {
    log('pushState_replaceState: change')
    window.onpopstate && window.onpopstate();
})