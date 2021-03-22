/*
 * @Author: zlb
 * @Date: 2021-03-09 14:21:44
 * @Description: file content
 */

import Taro from '@tarojs/taro';
import { tracksRoute_Map, tabBarRouter_Map } from '@tracks/common';
import { getUUID } from '@utils/taro-ali-log/config/utils.js';
import { getData, setData } from '@utils/cache';
import { paramsToPath } from '@utils/common';
import { smallBrowseEvent } from '@/utils/taro-ali-log/index.js';

let tabsTraceIds = {};
let localRtMap = {};
let linkpathkeys = [];

const clearlocalRtMap = () => {
  setData('linkRoutesMap', {});
  linkpathkeys = [];
  const keys = Object.keys(localRtMap);
  keys.forEach((ele) => {
    if (!tabBarRouter_Map[ele]) {
      delete localRtMap[ele];
    }
  });
};

const getTracesLink = (pages, trace_id, extendCurrent) => {
  if (!pages || !pages.length) return { tracesLink: [], pathList: [] };
  if (pages.length == 1 && tabBarRouter_Map[pages[0].route]) {
    clearlocalRtMap();
  }
  let pathList = [];
  const routeList = pages.map((item, i) => {
    const { options, route } = item;
    const key = tabBarRouter_Map[route]
      ? `${route}`
      : `${route}_${JSON.stringify(options)}_${i}`;
    pathList.push(key);
    if (!localRtMap[key]) {
      let path = route;
      let query = options;
      if (tabBarRouter_Map[path]) {
        if (tabsTraceIds[path]) {
          trace_id = tabsTraceIds[path];
        } else {
          tabsTraceIds[path] = trace_id;
        }
      }
      const [p_id, p_name] = tracksRoute_Map[path] || [];
      const page_id = path;
      let currentRoute = {
        query,
        path,
        page_name: p_name,
        trace_id,
        page_id,
        op_id: p_id,
        ...extendCurrent,
      };
      localRtMap[key] = currentRoute;
      return currentRoute;
    } else {
      return localRtMap[key];
    }
  });
  return { tracesLink: routeList, pathList };
};

function withBasePage(ops) {
  const { sendbWhenShow, initSend = true } = ops || {};
  return function BasePageComponent(WrappedComponent) {
    class BasePage extends WrappedComponent {
      componentWillMount() {
        console.log('withBasePage_componentWillMount--------');
        if (!this.trace_id) {
          this.trace_id = getUUID();
        }
        initSend && this.linkBuried(true);
        this.firstShow = true;
        if (super.componentWillMount) {
          super.componentWillMount();
        }
      }

      linkBuried = (isSend, extendObj = {}) => {
        console.log(localRtMap, 'localRtMap---');
        try {
          const pages = Taro.getCurrentPages();
          const { tracesLink, pathList } =
            getTracesLink(pages, this.trace_id, extendObj) || {};
          const preCurTrace = tracesLink.slice(-2);
          let linkRoutesMap = getData('linkRoutesMap') || {};
          let current = {};
          let preOne = {};

          if (preCurTrace.length == 2) {
            current = preCurTrace[1];
            preOne = preCurTrace[0];
          } else {
            current = preCurTrace[0];
          }
          let len = pathList.length;
          const preLastKey = linkpathkeys[len - 1];
          const curLastKey = pathList[len - 1];
          if (
            len &&
            !tabBarRouter_Map[current.path] &&
            pathList.length == linkpathkeys.length &&
            preLastKey !== curLastKey
          ) {
            preOne = localRtMap[preLastKey];
          }
          let currentRoute = {
            ...current,
            span_id: preOne.trace_id,
            p_page_id: preOne.page_id,
          };
          this.trace_id = current.trace_id;
          linkRoutesMap[this.trace_id] = currentRoute;
          // console.log(linkRoutesMap, currentRoute, 'currentRoute----')
          linkpathkeys = pathList;
          setData('currentRoute', currentRoute);
          setData('linkRoutesMap', linkRoutesMap);
          isSend && smallBrowseEvent({ event: { track_type: 1 } });
        } catch (e) {
          console.log(e);
        }
      };

      componentDidShow() {
        if (super.componentDidShow) {
          super.componentDidShow();
        }
        if (!this.firstShow) {
          this.linkBuried(sendbWhenShow);
        } else {
          this.firstShow = false;
        }
      }
    }

    return BasePage;
  };
}

export default withBasePage;
