(function(modules) {
	var installedModules = {};
	function __webpack_require__(moduleId) {
		// Check if module is in cache
		if(installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		// Create a new module (and put it into the cache)
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false,
			exports: {}
		};
		// Execute the module function
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		// Flag the module as loaded
		module.l = true;
		// Return the exports of the module
		return module.exports;
	}
	return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
({
   "./src/components/a/a.js":
   (function(module, exports) {
       eval("module.exports = 'a'\n\n//# sourceURL=webpack:///./src/components/a/a.js?");
    }),
    "./src/components/s.js":
    (function(module, exports, __webpack_require__) {
        eval("let a = __webpack_require__(/*! ./a/a */ \"./src/components/a/a.js\");\nmodule.exports = 's' + a;\n\n//# sourceURL=webpack:///./src/components/s.js?");
    }),
    "./src/index.js":
    (function(module, exports, __webpack_require__) {
      eval("const str = __webpack_require__(/*! ./components/s */ \"./src/components/s.js\")\n\nlog(`webpack原理分析开始`);\nlog(`引用执行结果： ${str}`);\n\n//# sourceURL=webpack:///./src/index.js?");
    })
});