/*
 * @Author: your name
 * @Date: 2021-03-12 13:55:03
 * @Description: file content
 */
import React, { Component } from 'react';
import { Button, View } from '@tarojs/components';
import { observer, inject } from 'mobx-react';
import withTrace from '../../../mixins/withTrace';
import Person from './person';

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
    this.props.store?.commonStore.addcount();
  };

  render() {
    const _props = this.props as PageStateProps;
    const {
      store: { commonStore },
    } = _props;
    return (
      <View className="index">
        {commonStore.count}
        <Button onClick={this.changeMuiltlevel}>点击</Button>
        <Person
          data={1}
          onClick={() => {
            this.changeMuiltlevel();
          }}
        />
      </View>
    );
  }
}

export default Index;
