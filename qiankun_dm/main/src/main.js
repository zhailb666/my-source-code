/*
 * @Author: your name
 * @Date: 2022-07-17 17:10:52
 * @Description: file content
 */
import Vue from 'vue'
import App from './App.vue'
import { registerMicroApps, start } from 'qiankun';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

registerMicroApps([
  {
    name: 'vue1',
    entry: '//localhost:3001',
    container: '#container',
    activeRule: '/app-vue1',
  },
  {
    name: 'vue2',
    entry: '//localhost:3002',
    container: '#container',
    activeRule: '/app-vue2',
  },
]);
// 启动 qiankun
start();
