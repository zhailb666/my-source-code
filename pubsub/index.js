function PubSub() {
    this.sub = { };
}


PubSub.prototype.subscribe = function(name, callback) {
    const some = this.sub[name]
    if(some) {
        some.push(callback)
    } else {
        this.sub[name] = [callback]
    }
    return function unSubscribe() {
        this.sub = some.filter(ele => ele  === callback)
    }
}


PubSub.prototype.publish = function(name, data) {
    const some = this.sub[name]
    if(some) {
        some.forEach(fn => {
            fn(data)
        });
    }
}


const getPubSubInstance = (function() {
    let pubsub = null;
    return function() {
        if(pubsub) {
            return pubsub
        }else {
            pubsub = new PubSub();
            return pubsub
        }
    }
})()
