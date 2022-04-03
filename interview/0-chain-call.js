/*
 * @Author: your name
 * @Date: 2022-04-03 21:39:56
 * @Description: file content
 */
const data = [
    { name: 'foo', age: 16, city: 'shanghai' },
    { name: 'bar', age: 24, city: 'hangzhou' },
    { name: 'fiz', age: 22, city: 'shanghai' },
    { name: 'baz', age: 19, city: 'hangzhou' }
];

function ArrSort(data) {
    this.rev = new Promise((resolve,reject) => {
    if (Array.isArray(data)) {
        this.data = data.concat()
    } else {
        this.data = []
    }
        this.resolve = resolve
    })
    return this
}

ArrSort.prototype.where = function(callback) {
    this.rev.then(() => {
    this.data = this.data.filter(callback)
    console.log(this.data, 'this.data---=--where')
    })
    return this
}

ArrSort.prototype.orderBy = function(key, desc){
    this.rev.then(() => {
    if (typeof key === 'string') {
        let value = []
        if (desc) {
            value = this.data.sort(function (m, n) {
                if (m[key] < n[key]) return -1
                else if (m[key] > n[key]) return 1
                else return 0
            })
        } else {
            value = this.data.sort(function (m, n) {
                if (m[key] < n[key]) return 1
                else if (m[key] > n[key]) return -1
                else return 0
            })
        }
        this.data = value
    }
    })
    return this
}
ArrSort.prototype.groupBy = function(key) {
    this.rev.then(() => {
    if (typeof key === 'string') {
        let value = {}
        for (let i = 0; i < this.data.length; i++) {
            let v = this.data[i]
            let kv = value[v[key]]
            if (kv) {
                kv.push(v)
            } else {
                value[v[key]] = [v]
            }
        }
        let back = []
        Object.keys(value).map((k) => {
            back.push(value[k])
        })
        this.data = back
    }
    })

    return this
}

ArrSort.prototype.execute = function() {
    console.log('执行 execute')
    return new Promise((resolve) => {
    this.rev.then(() => {
    resolve(this.data)
    })
    this.resolve()
    })
}

function query(data) {
    return new ArrSort(data)
}

query(data)
.where(item => item.age > 18)
.orderBy('age')
.groupBy('city')
.execute().then((g) => {
        console.log(g, 'g')
});