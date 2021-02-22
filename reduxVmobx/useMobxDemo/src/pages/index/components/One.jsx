import React, { Component } from 'react';
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from 'mobx-react';

// 知识点1， mobx自带的依赖收集渲染
@inject('store')
@observer
class OneTest extends Component {
  render() {
    // 知识点2 方式1渲染
    // const {
    //   testStore: {
    //     person: { a },
    //   },
    // } = this.props.store;
    // console.log(a.b);

    // 知识点2 方式2渲染
    // const {
    //   testStore: {
    //     person: {
    //       a: { b },
    //     },
    //   },
    // } = this.props.store;

    const { value } = this.props;
    console.log(`OneTest--render--${value}`);

    return (
      <View className="index">
        <Button>+</Button>
      </View>
    );
  }
}

export default OneTest;
