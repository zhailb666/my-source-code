
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

function asyncParallelBailHook () {
    log.red('AsyncParallelBailHook 和 AsyncSeriesBailHook 分别为异步 “并行” 和 “串行” 执行的 “钩子”')
    log.red('返回值不为 undefined，即有返回值，则提前执行最后的回调')

    // SyncBailHook 钩子的使用
    const { AsyncParallelBailHook } = tapable;

    // 创建实例
    let asyncParallelBailHook = new AsyncParallelBailHook(["name", "age"]);
    log()
    log.red('开始测试 asyncParallelBailHook,')
    // 注册事件
    log("time");
    asyncParallelBailHook.tapAsync("1", (name, age, next) => {
        setTimeout(() => {
            log("1", name, age, new Date());
            next();
        }, 1000);
    });

    asyncParallelBailHook.tapAsync("2", (name, age, next) => {
        setTimeout(() => {
            log("2", name, age, new Date());
            next(2222);
        }, 2000);
    });

    asyncParallelBailHook.tapAsync("3", (name, age, next) => {
        setTimeout(() => {
            log("3", name, age, new Date());
            next();
            log("time 哈哈_我是tapAsync3中的, 验证了 next为下个要执行的函数");
        }, 3000);
    });

    // 触发事件，让监听函数执行
    asyncParallelBailHook.callAsync("panda", 18, (v) => {
        log("complete");
        log.red(`最后的回调结果：${v}`)
        // log.red('开始测试 asyncParallelBailHook')
        // asyncSeriesHookTapPromise()
        log.red("-----加Bail的用处是：可以提前跳到最后回调中");
    });
}

function asyncSeriesBailHook () {
    log.red('AsyncParallelBailHook 和 AsyncSeriesBailHook 分别为异步 “并行” 和 “串行” 执行的 “钩子”')
    log.red('返回值不为 undefined，即有返回值，则立即停止向下执行其他事件处理函数')

    // SyncBailHook 钩子的使用
    const { AsyncSeriesBailHook } = tapable;

    // 创建实例
    let asyncSeriesBailHook = new AsyncSeriesBailHook(["name", "age"]);
    log()
    log.red('开始测试 asyncSeriesBailHook, 异步“串行” 执行的 “钩子”')
    // 注册事件
    log("time");
    asyncSeriesBailHook.tapAsync("1", (name, age, next) => {
        setTimeout(() => {
            log("1", name, age, new Date());
            next();
        }, 1000);
    });

    asyncSeriesBailHook.tapAsync("2", (name, age, next) => {
        setTimeout(() => {
            log("2", name, age, new Date());
            next(2222);
        }, 2000);
    });

    asyncSeriesBailHook.tapAsync("3", (name, age, next) => {
        setTimeout(() => {
            log("3", name, age, new Date());
            next();
            log("time 哈哈_我是tapAsync3中的, 验证了 next为下个要执行的函数");
        }, 3000);
    });

    // 触发事件，让监听函数执行
    asyncSeriesBailHook.callAsync("panda", 18, (v) => {
        log("complete");
        log.red(`最后的回调结果：${v}`)
        // log.red('开始测试 asyncParallelBailHook')
        // asyncSeriesHookTapPromise()
        log.red("-----加Bail的用处是：可以提前跳到最后回调中");
    });
}

function asyncSeriesWaterfallHook () {
    log.red('开始测试asyncSeriesWaterfallHook');
    log.red('第一个参数的值不为 undefined，即有返回值，则立即停止向下执行其他事件处理函数')
    log.red('第二个参数是传给下个回调的，且next函数只有二个参数，多传值是没有效果的, 如果没有传参则取上次有参数的值')
    // SyncBailHook 钩子的使用
    const { AsyncSeriesWaterfallHook } = tapable;

    // 创建实例
    let asyncSeriesWaterfallHook = new AsyncSeriesWaterfallHook(["name", "age"]);
    log()
    log.red('开始测试 asyncSeriesWaterfallHook')
    // 注册事件
    log("time");
    asyncSeriesWaterfallHook.tapAsync("1", (name, age, next) => {
        setTimeout(() => {
            log("1", name, age, new Date());
            // next(null, '来自name1', '来自age1', 'sdfsdfs');
            next(null, '来自fn1');
            // return 12
        }, 1000);
    });

    asyncSeriesWaterfallHook.tapAsync("2", (name, age, next) => {
        setTimeout(() => {
            log("2", name, age, new Date());
            next(null, '来自fn2');
        }, 2000);
    });

    asyncSeriesWaterfallHook.tapAsync("3", (name, age, next) => {
        setTimeout(() => {
            log("3", name, age, new Date());
            log.red('我即将返回了，后面还有的话也不执行了');
            next('我返回了');
            log("time 哈哈_我是多余的，的tapAsync3中的, 验证了 next为下个要执行的函数");
        }, 3000);
    });

    // 触发事件，让监听函数执行
    asyncSeriesWaterfallHook.callAsync("panda", 18, (v) => {
        log("complete");
        log.red(`最后的返回的结果：${v}`)
    });
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


function asyncParallelHookTapAsync() {
    // AsyncParallelHook 钩子：tapAsync/callAsync 的使用
    const { AsyncParallelHook } = tapable;

    log.red('异步并行执行测试');
    log.red('AsyncParallelHook 为异步并行执行，通过 tapAsync 注册的事件，通过 callAsync 触发');
    log.red('通过 tapPromise 注册的事件，通过 promise 触发（返回值可以调用 then 方法）');
    // 创建实例
    let asyncParallelHook = new AsyncParallelHook(["name", "age"]);

    // 注册事件
    log.red()
    log.red("开始测试asyncParallelHookTapAsync");
    log("time");
    asyncParallelHook.tapAsync("0", (name, age, done) => {
        setTimeout(() => {
            log("0", name, age, new Date());
            done();
        }, 3500);
    });

    asyncParallelHook.tapAsync("1", (name, age, done) => {
        setTimeout(() => {
            log("1", name, age, new Date());
            done();
        }, 1000);
    });

    asyncParallelHook.tapAsync("2", (name, age, done) => {
        setTimeout(() => {
            log("2", name, age, new Date());
            done();
        }, 2000);
    });

    asyncParallelHook.tapAsync("3", (name, age, done) => {
        setTimeout(() => {
            log("3", name, age, new Date());
            done();
            log("time");
        }, 3000);
    });

    // 触发事件，让监听函数执行
    asyncParallelHook.callAsync("panda", 18, () => {
        log("complete");
        log('')
        log.red('开始测试 asyncParallelHookTapPromise')
        asyncParallelHookTapPromise()
    });
}

function asyncParallelHookTapPromise() {
    // AsyncParallelHook 钩子：tapPromise/promise 的使用
    const { AsyncParallelHook } = tapable;

    // 创建实例
    let asyncParallelHook = new AsyncParallelHook(["name", "age"]);

    // 注册事件
    log("time");
    asyncParallelHook.tapPromise("1", (name, age) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                log("1", name, age, new Date());
                resolve("1");
            }, 1000);
        });
    });

    asyncParallelHook.tapPromise("2", (name, age) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                log("2", name, age, new Date());
                resolve("2");
            }, 2000);
        });
    });

    asyncParallelHook.tapPromise("3", (name, age) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                log("3", name, age, new Date());
                resolve("3");
                log("time");
            }, 3000);
        });
    });

    // 触发事件，让监听函数执行
    asyncParallelHook.promise("panda", 18).then(ret => {
        log(`tapPromise 执行完成: ${ret}`);
    });
}

function asyncSeriesHookTapAsync() {
    log.red('异步串行执行测试');
    log.red('asyncSeriesHook 为异步并行执行，通过 tapAsync 注册的事件，通过 callAsync 触发');
    log.red('通过 tapPromise 注册的事件，通过 promise 触发（返回值可以调用 then 方法）');
   // AsyncSeriesHook 钩子：tapAsync/callAsync 的使用
    const { AsyncSeriesHook } = tapable;

    // 创建实例
    let asyncSeriesHook = new AsyncSeriesHook(["name", "age"]);
    log()
    log.red('开始测试 asyncSeriesHookTapAsync')
    // 注册事件
    log("time");
    asyncSeriesHook.tapAsync("1", (name, age, next) => {
        setTimeout(() => {
            log("1", name, age, new Date());
            next();
        }, 1000);
    });

    asyncSeriesHook.tapAsync("2", (name, age, next) => {
        setTimeout(() => {
            log("2", name, age, new Date());
            next();
        }, 2000);
    });

    asyncSeriesHook.tapAsync("3", (name, age, next) => {
        setTimeout(() => {
            log("3", name, age, new Date());
            next();
            log.red("time 哈哈_我是tapAsync3中的, 验证了 next为下个要执行的函数");
        }, 3000);
    });

    // 触发事件，让监听函数执行
    asyncSeriesHook.callAsync("panda", 18, () => {
        log("complete");
        log()
        log.red('开始测试 asyncSeriesHookTapPromise')
        asyncSeriesHookTapPromise()
    });
}

function asyncSeriesHookTapPromise() {
    // AsyncSeriesHook 钩子：tapPromise/promise 的使用
    const { AsyncSeriesHook } = tapable;
    // 创建实例
    let asyncSeriesHook = new AsyncSeriesHook(["name", "age"]);

    // 注册事件
    log("time");
    asyncSeriesHook.tapPromise("1", (name, age) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                log("1", name, age, new Date());
                resolve("1");
            }, 1000);
        });
    });

    asyncSeriesHook.tapPromise("2", (name, age) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                log("2", name, age, new Date());
                resolve("2");
            }, 2000);
        });
    });

    asyncSeriesHook.tapPromise("3", (name, age) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                log("3", name, age, new Date());
                resolve("3");
                log("time");
            }, 3000);
        });
    });

    // 触发事件，让监听函数执行
    asyncSeriesHook.promise("panda", 18).then(ret => {
        log(`tapPromise回调完成: --${ret}`);
    });
}