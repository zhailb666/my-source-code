---
title: affix
nav:
  path: /components
  title: 组件
group:
  title: 通用组件
  path: /affix
  order: 3
---

## Affix 参数

| 参数       | 说明           | 类型    | 可选值 | 默认值  |
| ---------- | -------------- | ------- | ------ | ------- |
| custom      | custom 判断是否为自定义的头部navbar,  top: 0 定位是从胶囊下面开始计算； custom: true 时候 top:0 是从屏幕左上方计算的     | Number  | -      | false   |
| offsetTop   | 距离顶部多少元素会变为fix状态   | Boolean | -      | null |
| scrollTop | 滚动距离顶部的位置 | Number  | -      | -       |
| wrapStyle | 包裹容器样式 | Object  | -      | -       |

## Affix 事件(示例-无)
| 事件名称 | 说明                         | 返回参数 |
| -------- | ---------------------------- | -------- |
| onClose  | 元素被关闭触发的事件         | -        |
| onCancel | 点击了底部取消按钮触发的事件 | -        |

