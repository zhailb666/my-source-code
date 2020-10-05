<template>
  <div>
    <h2 @click="changeCount">{{msg}}、 F12查看</h2>
    <h3 >点击次数{{count}}</h3>
    <GlAvatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></GlAvatar>
    <div><input v-model="message" placeholder="edit me"></div>
    <p>Message is: {{ message }}</p>
    <keep-alive>
      <div>keep-alive{{count}}</div>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'LifeCycle',
  data () {
    return {
      count: 0,
      msg: '组件的生命周期',
      message: '哈哈哈~'
    }
  },
  methods: {
    changeCount () {
      this.count++
    }
  },
  // 第一次渲染做
  beforeCreate () {
    console.log('beforeCreate')
  },
  created () {
    console.log('created')
  },
  beforeMount () {
    console.log('beforeMount')
  },
  mounted () {
    console.log('mounted')
  },

  // 更新do
  beforeUpdate () {
    console.log('beforeUpdate')
  },
  updated () {
    console.log('updated')
  },

  // 销毁do
  beforeDestroy () {
    console.log('beforeDestroy')
  },
  destroyed () {
    console.log('destroyed')
  },

  activated () {
    console.log('activated')
  },
  deactivated () {
    console.log('deactivated')
  },

  errorCaptured () {
    console.log('errorCaptured')
  }
}
</script>
