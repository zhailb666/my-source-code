/*
 * @Author: your name
 * @Date: 2021-03-12 13:55:03
 * @Description: file content
 */
export enum RouterEnum {
  'Index' = 'pages/index/index',
  'AutorunPage' = 'pages/optimization/autorun-comp/index',
  'DelayPage' = 'pages/optimization/delay-comp/index',
  'FunPage' = 'pages/optimization/fun-comp/index',
  'ListPage' = 'pages/optimization/list-comp/index',
  'KeyPage' = 'pages/optimization/key-comp/index',
}

export default {
  pages: [
    RouterEnum.Index,
    RouterEnum.AutorunPage,
    RouterEnum.DelayPage,
    RouterEnum.FunPage,
    RouterEnum.ListPage,
    RouterEnum.KeyPage,
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
};
