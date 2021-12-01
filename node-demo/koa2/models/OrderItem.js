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
let OrderItemSchema = new mongoose.Schema({
  order_id: String,
  title: String,
  price: Number,
  num: Number
});

// 创建操作表的对象.
const OrderItem = mongoose.model("OrderItem", OrderItemSchema, "orderItems");

module.exports = OrderItem;