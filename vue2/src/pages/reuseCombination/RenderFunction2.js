// reference https://github.com/noeldelgado/gemini-scrollbar/blob/master/index.js
/* istanbul ignore next */
export default {
  name: 'ElScrollbar',

  props: {
    native: Boolean,
    wrapStyle: {},
    wrapClass: {},
    viewClass: {},
    viewStyle: {},
    noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    tag: {
      type: String,
      default: 'div'
    }
  },

  data () {
    return {
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0
    }
  },

  computed: {
    wrap () {
      return this.$refs.wrap
    }
  },

  render (h) {
    console.log(this, '------fn2------')
    const view = h(this.tag, {
      class: ['el-scrollbar__view', this.viewClass],
      style: this.viewStyle,
      ref: 'resize'
    }, this.$slots.default)
    return <div class='22' onClick={() => { this.showlog('哈哈哈~') }}>{[view]}</div>
  },

  methods: {
    showlog (v) {
      console.log(v)
    },
    handleScroll () {
      const wrap = this.wrap

      this.moveY = ((wrap.scrollTop * 100) / wrap.clientHeight)
      this.moveX = ((wrap.scrollLeft * 100) / wrap.clientWidth)
    },

    update () {
      let heightPercentage, widthPercentage
      const wrap = this.wrap
      if (!wrap) return

      heightPercentage = (wrap.clientHeight * 100 / wrap.scrollHeight)
      widthPercentage = (wrap.clientWidth * 100 / wrap.scrollWidth)

      this.sizeHeight = (heightPercentage < 100) ? (heightPercentage + '%') : ''
      this.sizeWidth = (widthPercentage < 100) ? (widthPercentage + '%') : ''
    }
  }
}
