!function (e) { var n = {}; function t(o) { if (n[o]) return n[o].exports; var r = n[o] = { i: o, l: !1, exports: {} }; return e[o].call(r.exports, r, r.exports, t), r.l = !0, r.exports } t.m = e, t.c = n, t.d = function (e, n, o) { t.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: o }) }, t.r = function (e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, t.t = function (e, n) { if (1 & n && (e = t(e)), 8 & n) return e; if (4 & n && "object" == typeof e && e && e.__esModule) return e; var o = Object.create(null); 
if (t.r(o), Object.defineProperty(o, "default", 
{ enumerable: !0, value: e }), 2 & n && "string" != typeof e) for (var r in e) t.d(o, r, function (n) { return e[n] }.bind(null, r)); return o }, t.n = function (e) { var n = e && e.__esModule ? function () { return e.default } : function () { return e }; return t.d(n, "a", n), n }, t.o = function (e, n) { return Object.prototype.hasOwnProperty.call(e, n) }, t.p = "", t(t.s = 4) }([function (e, n, t) { const o = t(1); t(3), console.log("2233"), log("webpack原理分析开始"), log("引用执行结果：" + o) }, function (e, n, t) { let o = t(2); e.exports = "s" + o }, function (e, n) { e.exports = "a" }, function (e, n) { let t = document.createElement("style"); t.innerHTML = "body {\\n  background-color: rebeccapurple;\\n}\\n", document.head.appendChild(t) }, function (e, n, t) { "use strict"; t.r(n); t(0); console.log(6), console.log("show") }]);