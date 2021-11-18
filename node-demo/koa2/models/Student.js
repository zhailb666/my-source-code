/*
 * @Author: your name
 * @Date: 2021-11-18 21:36:36
 * @Description: file content
 */
'use strict'

const mongoose = require('mongoose')

/**
 * 定义表结构
 * @type {mongoose}
 */
let StudentSchema = new mongoose.Schema({
  name: String,
  age: String,
  sex: Boolean,
  opened: {
    type: Boolean,
    default: false
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

// 创建操作表的对象.
const Student = mongoose.model('Student', StudentSchema, 'students')

module.exports = Student
