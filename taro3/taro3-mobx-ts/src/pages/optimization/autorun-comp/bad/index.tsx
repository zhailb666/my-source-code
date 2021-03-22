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
    const _props = this.props as PageStateProps;
    const {
      store: {
        commonStore: { list1, list2, list3 },
      },
    } = _props;
    return (
      <View className="index">
        <View className="header">
          {list1.map((ele, i) => {
            return (
              <View key={`${ele}_${i}`}>
                {ele}_{i}
              </View>
            );
          })}
        </View>
        <View className="content">
          {list2.map((ele, i) => {
            return (
              <View key={`${ele}_${i}`}>
                {ele}_{i}
              </View>
            );
          })}
        </View>
        <View className="footer">
          {list3.map((ele, i) => {
            return (
              <View key={`${ele}_${i}`}>
                {ele}_{i}
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

export default Index;
