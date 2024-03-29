/*
 * @Author: your name
 * @Date: 2021-03-12 13:55:03
 * @Description: file content
 */
import React, { Component } from 'react';
import { Button, View } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import withTrace from '../../../mixins/withTrace';
import Author from './Author';

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
  static count = 1;
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  changeMuiltlevel = () => {
    const {
      store: {
        commonStore: { seAuthorName },
      },
    } = this.props as PageStateProps;

    seAuthorName(`zlb_${Index.count++}`);
  };

  render() {
    const {
      store: {
        commonStore: { muiltlevel },
      },
    } = this.props as PageStateProps;
    return (
      <View className="index">
        {/* Index 观察的是 muiltlevel.author 引用，若整个过程中 muiltlevel.author 的引用并没有发生改变，则不重新渲染 */}
        <Button onClick={this.changeMuiltlevel}>点击</Button>
        <Author author={muiltlevel.author} />
      </View>
    );
  }
}

export default Index;
