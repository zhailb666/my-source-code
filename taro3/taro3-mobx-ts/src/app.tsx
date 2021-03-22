/*
 * @Author: your name
 * @Date: 2021-03-12 13:55:03
 * @Description: file content
 */
import React, { Component } from 'react';
import { Provider } from 'mobx-react';

import counterStore from './store/counter';
import commonStore from './store/commonStore';

import './app.scss';

const store = {
  counterStore,
  commonStore,
};

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 就是要渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
