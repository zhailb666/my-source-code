import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { getSystemInfo } from './utils.js'
import React from 'react'

let globalSystemInfo = getSystemInfo()

export interface AffixProps {
  custom?: false
  offsetTop?: number
  scrollTop?: number
  wrapStyle?: any
  color?: string
};

class Affix extends Component<AffixProps, { configStyle: any, height?: number, width?: number}> {
  static defaultProps = {
    custom: false,
    offsetTop: null,
    scrollTop: null, // 滚动高度
    wrapStyle: {}
  }
  
  constructor(props) {
    super(props)
    this.state = {
      configStyle: this.setStyle(globalSystemInfo)
    }
  }

  componentDidShow() {
    if (globalSystemInfo.ios) {
      globalSystemInfo = getSystemInfo()
      this.setState({
        configStyle: this.setStyle(globalSystemInfo)
      })
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.getChildrenSize()
    }, 500)
  }

  // https://developers.weixin.qq.com/miniprogram/dev/api/wxml/SelectorQuery.in.html
  // https://zjkdongao.cn/?p=124 组件里面选取节点问题
  getChildrenSize = () => {
    const query = Taro.createSelectorQuery().in(this.$scope)
    query
      .select('.affix_wrapper >>> .item')
      .boundingClientRect(res => {
        console.log(res, '.affix_wrapper-------')
        if (res) {
          this.setState({ height: res.height, width: res.width })
        }
      })
      .exec()
  }

  setStyle(systemInfo) {
    const { statusBarHeight, navBarHeight, capsulePosition, navBarExtendHeight, ios, windowWidth } = systemInfo
    const { color } = this.props
    let rightDistance = windowWidth - capsulePosition.right //胶囊按钮右侧到屏幕右侧的边距
    let leftWidth = windowWidth - capsulePosition.left //胶囊按钮左侧到屏幕右侧的边距

    let navigationbarinnerStyle = [
      `color:${color}`,
      //`background:${background}`,
      `height:${navBarHeight + navBarExtendHeight}px`,
      `padding-top:${statusBarHeight}px`,
      `padding-right:${leftWidth}px`,
      `padding-bottom:${navBarExtendHeight}px`
    ].join(';')
    return {
      navigationbarinnerStyle,
      navBarHeight,
      capsulePosition,
      navBarExtendHeight,
      ios,
      rightDistance
    }
  }

  getRenderType = () => {
    const { offsetTop, scrollTop = 0 } = this.props
    if (offsetTop) {
      if (offsetTop <= scrollTop) {
        // console.log(offsetTop, scrollTop, 'offsetTop > scrollTop')
        return 'fixedTop'
      } else {
        return ''
      }
    }
    return ''
  }

  render() {
    const { custom, scrollTop, wrapStyle } = this.props
    const { width, height } = this.state
    const { navBarHeight, navBarExtendHeight, fixedType = '', offsetBottom } = this.state.configStyle
    // console.log(width, height, navBarHeight, 'width-height')
    const type = this.getRenderType()
    return (
      <View className='affix_wrapper'>
        {
          {
            '': (
              <View className='item' style={{ ...wrapStyle }}>
                {this.props.children}
              </View>
            ),
            'fixedTop': (
              <View>
                <View style={{ ...wrapStyle, width: `${width}px`, height: `${height}px` }}></View>
                <View className='item' style={{ width: '100%', position: 'fixed', top: `${!custom ? 0 : navBarHeight + navBarExtendHeight}px`, ...wrapStyle }}>
                  {this.props.children}
                </View>
              </View>
            ),
            'bottomTop': (
              <View className='item' style={{ ...wrapStyle, position: 'fixed', bottom: `${offsetBottom}px` }}>
                {this.props.children}
              </View>
            )
          }[type]
        }
      </View>
    )
  }
}

export default Affix

// custom 如果不是自定义title, top: 0 定位是从胶囊下面开始计算； custom: true 时候 top:0 是从屏幕左上方计算的
