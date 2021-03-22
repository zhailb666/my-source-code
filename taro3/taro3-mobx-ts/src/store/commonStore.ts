/*
 * @Author: your name
 * @Date: 2021-03-15 21:47:31
 * @Description: file content
 */
/**
 * 微信登录Store
 */

import { observable, action } from 'mobx';

class commonStore {
  @observable.shallow list1 = new Array(1000).fill(1); // 极验滑动成功对象
  @observable.shallow list2 = new Array(1000).fill(1); // 极验滑动成功对象
  @observable.shallow list3 = new Array(1000).fill(1); // 极验滑动成功对象
  @observable count = 1;
  @observable muiltlevel = { author: { name: 'zlb' } };

  /**
   * 设置文本框内容
   * @param {*} val
   * @param {*} type
   */
  @action
  setStoreValue = (val, type) => {
    this[type] = val;
  };

  @action
  addcount = () => {
    this.count = this.count + 1;
  };

  @action
  seAuthorName = (name) => {
    this.muiltlevel.author.name = name;
  };
}

export default new commonStore();
