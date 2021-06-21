/*
 * @Author: your name
 * @Date: 2021-06-08 20:43:09
 * @Description: file content
 */
export const stringify = function(a) {
  try {
    console.log('dist-one-src1', JSON.stringify(a));
    return JSON.stringify(a);
  } catch (e) {
    console.log(e);
  }
};
