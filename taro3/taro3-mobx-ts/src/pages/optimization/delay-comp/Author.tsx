/*
 * @Author: your name
 * @Date: 2021-03-16 21:57:21
 * @Description: file content
 */
import React from 'react';
import { observer } from 'mobx-react';
import { View } from '@tarojs/components';

const Author = observer(({ author }) => <View>1111{author.name}</View>);

export default Author;
