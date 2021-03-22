/*
 * @Author: your name
 * @Date: 2021-03-12 13:55:03
 * @Description: file content
 */
import React, { Component } from 'react';
import { View } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import withTrace from '../../../mixins/withTrace';

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
  props: Partial<PageStateProps>;
}

@inject('store')
@observer
@withTrace()
class Index extends Component<any, { list: Array<{}> }> {
  constructor(props) {
    super(props);
    const list = new Array(10000).fill(1).map((ele, i) => {
      return { id: ele + i };
    });
    this.state = {
      list: list,
    };
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  deleteItem = (index = 1) => {
    let newlist = [...this.state.list];
    newlist.splice(index, 1);
    this.setState(() => ({ list: newlist }));
  };

  render() {
    const { list } = this.state;
    return (
      <View className="index">
        {/* 坏的写法 */}
        {list.map((ele, index) => {
          return (
            <View key={index} onClick={this.deleteItem.bind(this, index)}>
              {' '}
              {ele.id}{' '}
            </View>
          );
        })}
        {/* 好的写法 */}
        {/* {list.map((ele, index) => {
          return (
            <View key={ele.id} onClick={this.deleteItem.bind(this, index)}>
              {' '}
              {ele.id}{' '}
            </View>
          );
        })} */}
      </View>
    );
  }
}

export default Index;

// diff https://www.jianshu.com/p/3ba0822018cf
