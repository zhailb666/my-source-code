/*
 * @Author: your name
 * @Date: 2021-06-10 21:24:20
 * @Description: file content
 */
import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'access-mini 组件库',
  mode: 'site',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  publicPath: '/my-source-code/',
  // more config: https://d.umijs.org/config
  metas: [
    {
      property: 'og:site_name',
      content: 'vtn-mini-ui',
    },
    {
      name: 'keywords',
      content: 'c端,taro,react,vtn, access',
    },
    {
      name: 'description',
      content: '🏆 让c端开发更简单 包含 XXX 等多个组件。',
    },
  ],
  navs: {
    'en-US': [
      null,
      {
        title: 'GitHub',
        path: 'https://github.com/ant-design/pro-components',
      },
    ],
    'zh-CN': [
      null,
      {
        title: 'GitHub',
        path: 'https://github.com/ant-design/pro-components',
      },
    ],
  },
});
