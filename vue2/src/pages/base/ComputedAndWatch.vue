<template>
  <div class="hello">
    <h2>-----------------------{{ msg }}-----------------------</h2>
    <p>Original message: "{{ message }}"</p>
    <p>Computed reversed message: "{{ reversedMessage() }}"</p>
    <p>messageChangeTime: "{{ messageChangeTime }}"</p>
    <div @click="changeMessage">点击changeMessage</div>
  </div>
</template>

<script>
export default {
  name: 'ComputedAndWatch',
  data () {
    return {
      msg: 'ComputedAndWatch 计算属性和侦听器',
      dmessage: 'Hello',
      messageChangeTime: 0
    }
  },
  methods: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    },
    changeMessage: function () {
      this.dmessage = this.dmessage + new Date().getTime() // 只要这个地方改变watch message 方法就会调用
      this.message = this.dmessage + 1
    }
  },
  computed: {
    message: {
      // getter
      get: function () {
        return this.dmessage
      },
      // setter
      set: function (newValue) {
        this.dmessage = this.dmessage.toUpperCase()
      }
    }
  },
  watch: {
    message: function () {
      this.messageChangeTime++
    }
  }
}
</script>
