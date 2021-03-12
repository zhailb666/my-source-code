/*
 * @Author: your name
 * @Date: 2021-03-12 13:55:03
 * @Description: file content
 */
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import { RouterEnum } from '../../app.config';

import './index.scss';

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
  props: PageStateProps;
}

@inject('store')
@observer
class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  increment = () => {
    const { counterStore } = this.props.store;
    counterStore.increment();
  };

  decrement = () => {
    const { counterStore } = this.props.store;
    counterStore.decrement();
  };

  incrementAsync = () => {
    const { counterStore } = this.props.store;
    counterStore.incrementAsync();
  };

  getUrl = (url: RouterEnum) => {
    return `/${url}`;
  };

  render() {
    const {
      counterStore: { counter },
    } = this.props.store;
    return (
      <View className="index">
        <View className="title">性能优化篇</View>
        <View
          className="item"
          onClick={() => {
            Taro.navigateTo({ url: this.getUrl(RouterEnum.Index) });
          }}
        >
          1、依赖搜集（使用小组件）
        </View>
        <View
          className="item"
          onClick={() => {
            Taro.navigateTo({ url: this.getUrl(RouterEnum.ListPage) });
          }}
        >
          2、单独组件渲染列表
        </View>
        <View
          className="item"
          onClick={() => {
            Taro.navigateTo({ url: this.getUrl(RouterEnum.KeyPage) });
          }}
        >
          3、不要使用数组的索引作为 key
        </View>
        <View
          className="item"
          onClick={() => {
            Taro.navigateTo({ url: this.getUrl(RouterEnum.DelayPage) });
          }}
        >
          4、晚一点使用间接引用值
        </View>
        <View
          className="item"
          onClick={() => {
            Taro.navigateTo({ url: this.getUrl(RouterEnum.FunPage) });
          }}
        >
          5、避免在 render 方法中创建新的闭包
        </View>
      </View>
    );
  }
}

export default Index;
