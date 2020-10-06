<template>
  <div class="hello">
    <h2>-----------------------{{ msg }}-----------------------</h2>
    <input v-model="message" placeholder="edit me">
    <input v-model.lazy="message" placeholder="lazy">
    <input v-model.number="message" placeholder="number 第一个是number才有效~">
    <input v-model.trim="message" placeholder="trim">
    <input v-model.trim="ms">
    <input v-model.number="count">
    <p>Message is: {{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'FormBind',
  data () {
    return {
      count: 1,
      ms: undefined,
      msg: 'FormBind 表单输入绑定',
      message: undefined
    }
  },
  watch: {
    message: function (v) {
      console.log(v, '--------')
    }
  }
}
</script>
<style scoped>
  .text-danger {
    color: red
  }
</style>
