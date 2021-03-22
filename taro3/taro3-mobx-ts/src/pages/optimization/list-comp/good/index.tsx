/*
 * @Author: your name
 * @Date: 2021-03-15 21:54:21
 * @Description: file content
 */
/*
 * @Author: your name
 * @Date: 2021-03-12 13:55:03
 * @Description: file content
 */
import React, { Component } from 'react';
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import withTrace from '../../../../mixins/withTrace';
import List from './list';
import Couter from './couter';

type PageStateProps = {
  store: {
    commonStore: any;
    counterStore: {
      counter: number;
      increment: Function;
      decrement: Function;
      incrementAsync: Function;
    };
  };
};

interface Index {
  props: Partial<PageStateProps>;
}

@inject('store')
@observer
@withTrace()
class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <List />
        <Couter />
      </View>
    );
  }
}

export default Index;
