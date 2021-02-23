/*
 * @Author: your name
 * @Date: 2021-02-22 21:51:04
 * @Description: file content
 */
import { observable, action, computed } from 'mobx';

class Test {
  @observable person = { a: { b: 2 } };
  @observable.shallow dog = { a: { b: 1 } };
  @observable.shallow list = [{ a: 2 }];
  @observable lists = [{ a: 2 }];
  @observable p1 = 1;
  @observable p2 = 2;
  @observable p3 = 3;
  @observable p4 = 4;

  @action
  setStoreValue = (key, value) => {
    this[key] = value;
  };
}

export default new Test();
