<!--
 * @Author: your name
 * @Date: 2021-06-19 21:07:34
 * @Description: file content
-->
---
title: 组件总览
nav:
  path: /components
  title: 组件
group: 
  path: /g1
  title: 架构设计
  order: 0
order: 0
---

# 架构设计

ui 是基于 Taro1 而开发的模板组件，提供了更高级别的抽象支持，开箱即用。可以显著的提升制作 CRUD 页面的效率，更加专注于页面。

- 1
- ...

## CRUD

ProTable，ProDescriptions，ProForm 都是基于 ProField 来进行封装。ProTable 和 ProDescriptions 根据 valueType 来渲染不同的 ProField，Form 则是通过不同的 FormField 来实现封装。

使用同样的底层实现为 ProTable，ProDescriptions，ProForm 打通带来了便利。ProForm 可以很方便的实现只读模式，ProTable 可以快速实现查询表单和可编辑表格。ProDescriptions 可以实现节点编辑，以下有个例子可以切换三个组件。

## 与网络请求库配置使用

ProTable，ProList 使用了新的数据结构，如果你使用了我们约定的参数使用起来会非常简单。

```tsx | pure
const msg: {
  data: T[];
  page: number;
  success: boolean;
  total: number;
} = {
  data: [],
  page: 1,
  success: true,
  total: 0,
};
```
