(function(window, document){
    var jsonp = function(url, data, callback) {
    
       let qaramsUrl = url.indexOf('?') === -1 ? '?' : '&';
       for(const d in data) {
           qaramsUrl += `${d}=${data[d]}&`
       }

       const bcName = Math.random().toString().replace('.', '')
       qaramsUrl += `callback=${bcName}`

       let scriptEle = document.createElement('script');
       scriptEle.src = `${url}${qaramsUrl}`

       window[bcName] = function(...arg) {
           callback(...arg);
           document.body.removeChild(scriptEle)
       }

       document.body.appendChild(scriptEle);
       return bcName; //模拟时候需要
    }

    window.jsonp = jsonp;
})(window, document)