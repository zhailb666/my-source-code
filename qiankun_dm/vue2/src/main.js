/*
 * @Author: your name
 * @Date: 2022-07-17 17:03:57
 * @Description: file content
 */
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// let router = null;
let instance = null;

function render(props = {}) {
  const { container } = props;
  console.log(container, 'container')
  console.log( container.querySelector('#app'))
  // router = new VueRouter({
  //   base: window.__POWERED_BY_QIANKUN__ ? '/app-vue1/' : '/',
  //   mode: 'history',
  //   // routes,
  // });

  instance = new Vue({
    // router,
    store: {},
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}


if (!window.__POWERED_BY_QIANKUN__) {
  render();
}



export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  // router = null;
}
