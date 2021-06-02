"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * @Author: your name
 * @Date: 2021-06-02 22:10:09
 * @Description: file content
 */

var query_string_1 = require("query-string");

var react_1 = require("react");

var react_router_1 = require("react-router");

var parseConfig = {
  skipNull: true,
  skipEmptyString: true,
  parseNumbers: false,
  parseBooleans: false
};

exports["default"] = function (initialState, options) {
  var _a = (options || {}).navigateMode,
      navigateMode = _a === void 0 ? 'push' : _a;
  var location = react_router_1.useLocation();
  var history = react_router_1.useHistory();

  var _b = __read(react_1.useState(false), 2),
      update = _b[1];

  var initialStateRef = react_1.useRef(typeof initialState === 'function' ? initialState() : initialState || {});
  var queryFromUrl = react_1.useMemo(function () {
    return query_string_1.parse(location.search, parseConfig);
  }, [location.search]);
  var targetQuery = react_1.useMemo(function () {
    return __assign(__assign({}, initialStateRef.current), queryFromUrl);
  }, [queryFromUrl]);

  var setState = function setState(s) {
    var newQuery = typeof s === 'function' ? s(targetQuery) : s; // 1. 如果 setState 后，search 没变化，就需要 update 来触发一次更新。比如 demo1 直接点击 clear，就需要 update 来触发更新。
    // 2. update 和 history 的更新会合并，不会造成多次更新

    update(function (v) {
      return !v;
    });
    history[navigateMode]({
      hash: location.hash,
      search: query_string_1.stringify(__assign(__assign({}, queryFromUrl), newQuery), parseConfig) || '?'
    });
  };

  return [targetQuery, setState];
};