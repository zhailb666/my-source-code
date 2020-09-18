
/**
 * 
class SettlementLog {
    columns = [1,2,3];  // 优先于constructor里面的声明
  
    constructor(props) {
      this.state = { }
    }

    //箭头函数编译在this上与 this.state声明等同;
    show = () => {
        console.log('show')
    }

    say() {
        return 123456;
    }
  
    // 原型链上的属性, 声明的时候就会定义了；
    render() {
      return 123;
    }
}
*/

function _instanceof(left, right) { 
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { 
        return !!right[Symbol.hasInstance](left); 
    } 
    return left instanceof right; 
}

function _classCallCheck(instance, Constructor) { 
    if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } 
}

function _defineProperties(target, props) { 
    for (let i = 0; i < props.length; i++) { 
        const descriptor = props[i]; 
        descriptor.enumerable = descriptor.enumerable || false; 
        descriptor.configurable = true;
         if ("value" in descriptor) descriptor.writable = true; 
         Object.defineProperty(target, descriptor.key, descriptor); 
    } 
}

function _createClass(Constructor, protoProps, staticProps) { 
    if (protoProps) _defineProperties(Constructor.prototype, protoProps); 
    if (staticProps) _defineProperties(Constructor, staticProps); 
    return Constructor; 
}

function _defineProperty(obj, key, value) { 
    if (key in obj) {
         Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }); 
    } else { 
        obj[key] = value; 
    } 
    return obj; 
}

const SettlementLog = function () {
    function SettlementLog(props) {
        _classCallCheck(this, SettlementLog);

        _defineProperty(this, "columns", [1, 2, 3]);

        _defineProperty(this, "show", function () {
            console.log('show');
        });

        this.state = {};
    }

    _createClass(SettlementLog, [{
        key: "say",
        value: function say() {
          return 123456;
        }
      },{
        key: "render",
        value: function render() {
            return 123;
        }
    }]);

    return SettlementLog;
}();