/*
 * @Author: your name
 * @Date: 2021-03-12 14:14:45
 * @Description: file content
 */

// 简单的时差记录
export const tracksTime = (function () {
  let logs_group = {};
  let startTime_group = {};
  let counter_group = {};
  return ({ key, down, group, print, extra }: any) => {
    const flag = true;
    try {
      let startTime = startTime_group[group];
      if (!logs_group[group]) {
        logs_group[group] = {};
      }
      if (!counter_group[group]) {
        counter_group[group] = {};
      }
      let logs = logs_group[group];
      const newTime = new Date().getTime();
      let diffTime = 0;
      counter_group[group][key] = (counter_group[group][key] || 0) + 1;
      if (!startTime) {
        startTime_group[group] = newTime;
      } else {
        diffTime = newTime - startTime;
      }
      if (down) {
        logs[key] = [newTime, diffTime, counter_group[group][key]];
        if (Object.keys(logs).length > 1) {
          flag && console.table(logs);
        }
        logs_group[group] = {};
        startTime_group[group] = 0;
      } else {
        logs[key] = [newTime, diffTime, counter_group[group][key]];
        if (print) {
          flag && console.table(logs);
        }
      }
      flag &&
        console.log(`${group}-${key}-${extra || ''}`, logs[key].join('-'));
    } catch (e) {
      flag && console.log(e, 'tracksTime error');
    }
  };
})();

export const tracksTimeP = (data) => {
  setTimeout(() => {
    tracksTime(data);
  }, 0);
};

export const deepObj = (obj) => {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (e) {
    return obj || {};
  }
};

export const paramsToPath = (data) => {
  if (!data) return '';
  let str = '';
  try {
    Object.keys(data).forEach((ele) => {
      if (ele && ele != 'undefined') {
        str = str + `${ele}=${data[ele]}&`;
      }
    });
    return str;
  } catch (e) {
    return str;
  }
};
