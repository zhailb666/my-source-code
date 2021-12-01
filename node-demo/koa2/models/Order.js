/*
 * @Author: your name
 * @Date: 2021-12-01 21:54:56
 * @Description: file content
 */
"use strict";

const mongoose = require("mongoose");

/**
 * 定义表结构
 * @type {mongoose}
 */
let OrderSchema = new mongoose.Schema({
 order_id: String,
  uid: Number,
  trade_no: String,
  all_price: Number,
  all_num: Number
});

// 创建操作表的对象.
const Order = mongoose.model("Order", OrderSchema, "orders");

module.exports = Order;