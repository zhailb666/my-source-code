/*
 * @Author: your name
 * @Date: 2021-03-12 13:55:03
 * @Description: file content
 */
import React, { Component } from 'react';
import { View } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import withTrace from '../../../../mixins/withTrace';

type PageStateProps = {
  store: {
    counterStore: {
      counter: number;
      increment: Function;
      decrement: Function;
      incrementAsync: Function;
    };
  };
};

interface Index {
  props: { data: any; onClick: any };
}

@inject('store')
@observer
@withTrace({ cname: 'person' })
class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { data } = this.props;
    return <View className="index">{JSON.stringify(data)}</View>;
  }
}

export default Index;
