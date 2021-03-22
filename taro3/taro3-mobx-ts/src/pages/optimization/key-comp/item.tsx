/*
 * @Author: your name
 * @Date: 2021-03-12 13:55:03
 * @Description: file content
 */
import React, { PureComponent } from 'react';
import { View } from '@tarojs/components';

type PageStateProps = {
  onClick: any;
  // key: any;
  value: any;
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

class Index extends PureComponent {
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

  render() {
    const { value, onClick } = this.props;
    return (
      <View onClick={onClick && onClick} className="index">
        {value.id}
      </View>
    );
  }
}

export default Index;
