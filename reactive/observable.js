/*
 * @Author: your name
 * @Date: 2021-09-08 21:24:27
 * @Description: file content
 */
import { createObservable } from './internals.js';
export function observable(target) {
    return createObservable(null, null, target);
}