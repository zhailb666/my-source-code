window.log = (...str) => {
   var t = document.createElement('div');
    t.style.borderBottom = '1px solid #efefef'
    t.style.height = '26px'
    t.style.lineHeight = '26px'
    t.innerText = str
    document.body.appendChild(t)
    return t;
}

window.log.red = (...str) => {
    var t =  log(...str)
    t.style.color = 'red'
 }


window.onloadfn = [];
window.doc = (fn) => {
    if(typeof fn === 'function') {
        window.onloadfn.push(fn);
    } 
}

window.onload = function() {
    window.onloadfn.length && window.onloadfn.forEach(f => {
        f()
    });
}

function forEach(array, callback) {
    let index = -1;
    const len = array.length;
    while( ++index < len) {
        callback(array[index], index)
    }
    return array;
}


