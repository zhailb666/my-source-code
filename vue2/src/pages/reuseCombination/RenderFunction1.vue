<script>
export default {
  functional: true, // 没有状态和属性，this获取不到
  components: {

  },
  name: 'RenderFunction1',
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  data () {
    return {
      msg: 'RenderFunction1'
    }
  },
  methods: {
    handler: (v) => {
      console.log(v)
    }
  },
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (h, context) {
    console.log(this, context, '-------')
    const nodes = [h(
      'div',
      {class: 'fn1', ...context.data},
      context.children
    )]
    return <div onClick={() => { console.log(112221) }}>
      wrapper
      {nodes}
    </div>
  }
}
</script>
