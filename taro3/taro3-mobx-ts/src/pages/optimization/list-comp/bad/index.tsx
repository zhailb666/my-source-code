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
import { View, Input, Button } from '@tarojs/components';
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

  toAdd = () => {
    this.props.store?.commonStore.addcount();
  };

  render() {
    const _props = this.props as PageStateProps;
    const {
      store: {
        commonStore: { list3, count },
      },
    } = _props;
    return (
      <View className="index">
        {count}
        <Button onClick={this.toAdd}>加1</Button>
        {list3.map((ele, i) => {
          return (
            <View key={`${ele}_${i}`}>
              {ele}_{i}
            </View>
          );
        })}
      </View>
    );
  }
}

export default Index;
