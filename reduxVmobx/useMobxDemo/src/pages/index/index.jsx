import React, { Component } from 'react';
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from 'mobx-react';

import OneComp from './components/One';

import './index.less';

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

  componentDidUpdate(prevProps) {
    const {
      counterStore: { counter },
    } = this.props.store;
    console.log(
      `current:${counter}`,
      `prev:${prevProps.store.counterStore.counter}`,
      'mobx---componentDidUpdate----',
    );
  }

  personAdd = () => {
    const {
      testStore: { person },
    } = this.props.store;
    person.a.b = person.a.b + 1;
  };

  dogAdd = () => {
    const {
      testStore: { dog },
    } = this.props.store;
    dog.a.b = dog.a.b + 1;
  };

  shallowListChange = () => {
    const {
      testStore: { list },
    } = this.props.store;
    list[0].a = list[0].a + 1;
  };

  listsChange = () => {
    const {
      testStore: { lists },
    } = this.props.store;
    lists[0].a = lists[0].a + 1;
  };

  listChange = () => {
    const { testStore } = this.props.store;
    testStore.list = [{ a: testStore.list[0].a + 1 }];
  };

  render() {
    const {
      counterStore: { counter },
      testStore: { person, dog, list, lists },
    } = this.props.store;
    // console.log(testStore, 'testStore----');
    return (
      <View className="index">
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Button onClick={this.personAdd}>person</Button>
        <Button onClick={this.dogAdd}>dog</Button>
        <Button onClick={this.shallowListChange}>shallowListChange</Button>
        <Button onClick={this.listChange}>ListChange</Button>
        <Button onClick={this.listsChange}>listsChange</Button>
        {/* // 知识点3 bad 与 good 的两种写法 */}
        <OneComp
          value="bad"
          onClick={() => {
            this.listsChange();
          }}
        />
        <OneComp value="good" onClick={this.listsChange} />
        <View>
          {person.a.b}
          {dog.a.b}
        </View>
        <View>{list[0].a}</View>
        <View>{lists[0].a}</View>
        <Text>{counter}</Text>
      </View>
    );
  }
}

export default Index;
