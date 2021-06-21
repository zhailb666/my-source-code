/*
 * @Author: your name
 * @Date: 2021-06-21 22:58:07
 * @Description: file content
 */
/**
 * title: Form and Table data binding
 * desc: useAntdTable returns a search object after receiving a form instance. This is an example of antd v3, see [link](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useAntdTable/demo/demo3.tsx) for an example of antd v4.
 *
 * title.zh-CN: Form 与 Table 联动
 * desc.zh-CN: useAntdTable 接收 form 实例后，会返回 search 对象。这是一个 antd v3 示例，antd v4 示例见 [链接](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useAntdTable/demo/demo3.tsx)。
 */

import React from 'react';
import { stringify } from 'lb-t-util';

const Demos = () => {
  return <div>{stringify({ name: 'zlb' })}</div>;
};

export default Demos;
