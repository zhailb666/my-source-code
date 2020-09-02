// 监听者,监听对象属性值的变化
class Observer {
    constructor(value) {
      this.value = value;
      this.walk(value);
    }
    // 遍历属性值并监听
    walk(value) {
      Object.keys(value).forEach(key => this.convert(key, value[key]));
    }
    // 执行监听的具体方法
    convert(key, val) {
      defineReactive(this.value, key, val);
    }
}

function defineReactive(obj, key, val) {
    const dep = new Dep();
    // 给当前属性的值添加监听
    let chlidOb = observe(val);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: () => {
            // 如果Dep类存在target属性，将其添加到dep实例的subs数组中
            // target指向一个Watcher实例，每个Watcher都是一个订阅者
            // Watcher实例在实例化过程中，会读取data中的某个属性，从而触发当前get方法
            if (Dep.target) {
                dep.depend();
            }
            return val;
        },
        set: newVal => {
            if (val === newVal) return;
            val = newVal;
            // 对新值进行监听
            chlidOb = observe(newVal);
            // 通知所有订阅者，数值被改变了
            dep.notify();
        },
    });
}

function observe(value) {
    // 当值不存在，或者不是复杂数据类型时，不再需要继续深入监听
    if (!value || typeof value !== 'object') {
        return;
    }

    return new Observer(value);
}