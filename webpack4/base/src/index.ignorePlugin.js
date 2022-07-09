/*
 * @Author: your name
 * @Date: 2020-08-22 13:00:05
 * @Description: file content
 */
// require('./index')
import moment from "moment";
import 'moment/locale/zh-cn';

moment.locale('zh-cn')

let r = moment().endOf('day').fromNow();
console.log(r)
