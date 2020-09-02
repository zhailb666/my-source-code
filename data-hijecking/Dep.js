let uid = 0;
  // 用于储存订阅者并发布消息

class Dep {
    constructor() {
        this.subs = [];
    }

    // 触发target上的Watcher中的addDep方法,参数为dep的实例本身
    depend() {
        Dep.target.addDep(this);
    }

    // 添加订阅者
    addSub(sub) {
    this.subs.push(sub);
    }
    
    notify = function(name, data) {
      // 通知所有的订阅者(Watcher)，触发订阅者的相应逻辑处理
      this.subs.forEach(sub => sub.update());
    }
}

Dep.target = null;


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
