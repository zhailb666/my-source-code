
const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,

    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
 } = tapable;

function syncHook () {
    log.red('SyncHook 为串行同步执行，不关心事件处理函数的返回值，在触发事件之后，会按照事件注册的先后顺序执行所有的事件处理函数')
    // SyncHook 钩子的使用
    const { SyncHook } = tapable;

    // 创建实例
    let syncHook = new SyncHook(["name", "age"]);

    // 注册事件
    syncHook.tap("1", (name, age) => log("1", name, age));
    syncHook.tap("2", (name, age) => log("2", name, age));
    syncHook.tap("3", (name, age) => log("3", name, age));

    // 触发事件，让监听函数执行
    syncHook.call("panda", 18);
}

function syncBailHook () {
    log.red('SyncBailHook 同样为串行同步执行，如果事件处理函数执行时有一个返回值不为空（即返回值为 undefined），则跳过剩下未执行的事件处理函数（如类的名字，意义在于保险')

    // SyncBailHook 钩子的使用
    const { SyncBailHook } = tapable;

    // 创建实例
    let syncBailHook = new SyncBailHook(["name", "age"]);

    // 注册事件
    syncBailHook.tap("1", (name, age) => {
        log("1", name, age)
    });

    syncBailHook.tap("2", (name, age) => {
        log("2", name, age);
        return "2";
    });

    syncBailHook.tap("3", (name, age) => {
        log("3", name, age)
    });

    // 触发事件，让监听函数执行
    syncBailHook.call("panda", 18);
}

function syncWaterfallHook () {
    log.red('SyncWaterfallHook 为串行同步执行，上一个事件处理函数的返回值作为参数传递给下一个事件处理函数，依次类推')
    log.red('正因如此，只有第一个事件处理函数的参数可以通过 call 传递，而 call 的返回值为最后一个事件处理函数的返回值。')

    // SyncWaterfallHook 钩子的使用
    const { SyncWaterfallHook } = tapable;

    // 创建实例
    let syncWaterfallHook = new SyncWaterfallHook(["name", "age"]);

    // 注册事件
    syncWaterfallHook.tap("1", (name, age) => {
        log("1", name, age);
        return "1";
    });

    syncWaterfallHook.tap("2", data => {
        log("2", data);
        return "2";
    });

    syncWaterfallHook.tap("3", data => {
        log("3", data);
        return "3"
    });

    // 触发事件，让监听函数执行
    let ret = syncWaterfallHook.call("panda", 18);
    log("call", ret);
}

function syncLoopHook() {
    log.red('SyncLoopHook 为串行同步执行，事件处理函数返回 true 表示继续循环，即循环执行当前事件处理函数，返回 undefined 表示结束循环')
    log.red('SyncBailHook 只决定是否继续向下执行后面的事件处理函数，而 SyncLoopHook 的循环是指循环执行每一个事件处理函数，直到返回 undefined 为止，才会继续向下执行其他事件处理函数，执行机制同理')
    
    log('')
    // SyncLoopHook 钩子的使用
    const { SyncLoopHook } = tapable;

    // 创建实例
    let syncLoopHook = new SyncLoopHook(["name", "age"]);

    // 定义辅助变量
    let total1 = 0;
    let total2 = 0;

    // 注册事件
    syncLoopHook.tap("1", (name, age) => {
        log("1", name, age, total1);
        return total1++ < 2 ? true : undefined;
    });

    syncLoopHook.tap("2", (name, age) => {
        log("2", name, age, total2);
        return total2++ < 2 ? true : undefined;
    });

    syncLoopHook.tap("3", (name, age) => {
        log("3", name, age)
    });

    // 触发事件，让监听函数执行
    syncLoopHook.call("panda", 18);
}


function asyncParallelHookOne() {
    // AsyncParallelHook 钩子：tapAsync/callAsync 的使用
    const { AsyncParallelHook } = tapable;

    // 创建实例
    let asyncParallelHook = new AsyncParallelHook(["name", "age"]);

    // 注册事件
    log("time");
    asyncParallelHook.tapAsync("1", (name, age, done) => {
        settimeout(() => {
            log("1", name, age, new Date());
            done();
        }, 1000);
    });

    asyncParallelHook.tapAsync("2", (name, age, done) => {
        settimeout(() => {
            log("2", name, age, new Date());
            done();
        }, 2000);
    });

    asyncParallelHook.tapAsync("3", (name, age, done) => {
        settimeout(() => {
            log("3", name, age, new Date());
            done();
            log("time");
        }, 3000);
    });

    // 触发事件，让监听函数执行
    asyncParallelHook.callAsync("panda", 18, () => {
        log("complete");
    });
}

function asyncParallelHookTwo() {
    // AsyncParallelHook 钩子：tapPromise/promise 的使用
    const { AsyncParallelHook } = tapable;

    // 创建实例
    let asyncParallelHook = new AsyncParallelHook(["name", "age"]);

    // 注册事件
    console.log("time");
    asyncParallelHook.tapPromise("1", (name, age) => {
        return new Promise((resolve, reject) => {
            settimeout(() => {
                console.log("1", name, age, new Date());
                resolve("1");
            }, 1000);
        });
    });

    asyncParallelHook.tapPromise("2", (name, age) => {
        return new Promise((resolve, reject) => {
            settimeout(() => {
                console.log("2", name, age, new Date());
                resolve("2");
            }, 2000);
        });
    });

    asyncParallelHook.tapPromise("3", (name, age) => {
        return new Promise((resolve, reject) => {
            settimeout(() => {
                console.log("3", name, age, new Date());
                resolve("3");
                console.log("time");
            }, 3000);
        });
    });

    // 触发事件，让监听函数执行
    asyncParallelHook.promise("panda", 18).then(ret => {
        console.log(ret);
    });
}

function asyncSeriesHookOne() {
   // AsyncSeriesHook 钩子：tapAsync/callAsync 的使用
    const { AsyncSeriesHook } = tapable;

    // 创建实例
    let asyncSeriesHook = new AsyncSeriesHook(["name", "age"]);

    // 注册事件
    console.time("time");
    asyncSeriesHook.tapAsync("1", (name, age, next) => {
        settimeout(() => {
            console.log("1", name, age, new Date());
            next();
        }, 1000);
    });

    asyncSeriesHook.tapAsync("2", (name, age, next) => {
        settimeout(() => {
            console.log("2", name, age, new Date());
            next();
        }, 2000);
    });

    asyncSeriesHook.tapAsync("3", (name, age, next) => {
        settimeout(() => {
            console.log("3", name, age, new Date());
            next();
            console.timeEnd("time");
        }, 3000);
    });

    // 触发事件，让监听函数执行
    asyncSeriesHook.callAsync("panda", 18, () => {
        console.log("complete");
    });
}

function asyncSeriesHookTwo() {
    // AsyncSeriesHook 钩子：tapPromise/promise 的使用
    const { AsyncSeriesHook } = tapable;

    // 创建实例
    let asyncSeriesHook = new AsyncSeriesHook(["name", "age"]);

    // 注册事件
    console.log("time");
    asyncSeriesHook.tapPromise("1", (name, age) => {
        return new Promise((resolve, reject) => {
            settimeout(() => {
                console.log("1", name, age, new Date());
                resolve("1");
            }, 1000);
        });
    });

    asyncSeriesHook.tapPromise("2", (name, age) => {
        return new Promise((resolve, reject) => {
            settimeout(() => {
                console.log("2", name, age, new Date());
                resolve("2");
            }, 2000);
        });
    });

    asyncParallelHook.tapPromise("3", (name, age) => {
        return new Promise((resolve, reject) => {
            settimeout(() => {
                console.log("3", name, age, new Date());
                resolve("3");
                console.log("time");
            }, 3000);
        });
    });

    // 触发事件，让监听函数执行
    asyncSeriesHook.promise("panda", 18).then(ret => {
        console.log(ret);
    });
}