function uniqueReduce(arr) {
    return arr.reduce((target, current, index) => {
        if(target.indexOf(current) === -1) {
            target.push(current)
        }
        return target;
    }, [])
}

function uniqueWhile(arr) {
    const bc = [];
    let index = -1
    while(index < arr.length) {
        ++index;
        const current = arr[index];
        if(bc.indexOf(current) === -1) {
            bc.push(current)
        }
    }
    return bc;
}

function uniqueForEach(arr) {
    const bc = [];
    let index = -1
    arr.forEach((current, i) => {
        if(bc.indexOf(current) === -1) {
            bc.push(current)
        }
    })
    return bc;
}

function uniqueFor(arr) {
    const bc = [];
    for(let i = 0; i< arr.length; i++) {
        const current = arr[i]
        if(bc.indexOf(current) === -1) {
            bc.push(current)
        }
    }
    return bc;
}

function uniqueSet(arr) {
    return Array.from(new Set([...arr]))
}

function uniqueFilter(arr) {
    return arr.filter((ele, i) => arr.indexOf(ele) === i)
}