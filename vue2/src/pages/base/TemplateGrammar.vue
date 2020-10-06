<template>
  <div class="hello">
    <h2>-----------------------{{ msg }}-----------------------</h2>
    <p>Using v-html directive: <span v-html="rawHtml"></span></p>
    <div v-bind:id="'dynamicId'"></div>
    <button v-bind:disabled="isButtonDisabled">Button</button>
    <div>三目表达式 {{ ok ? 'YES' : 'NO' }}</div>
    <h3>###指令</h3>
    <a v-bind:href="url">测试连接</a>
    <a v-bind:[attributeName]="url"> 测试动态连接</a>
    <a v-on:[eventName]="doSomething"> 测试动态事件 </a>
    <h3>###指令缩写</h3>
    <a :href="url">测试连接</a>
    <a :[attributeName]="url"> 测试动态连接 </a>
    <a @[eventName]="doSomething"> 测试动态事件</a>
  </div>
</template>

<script>
export default {
  name: 'TemplateGrammar',
  data () {
    return {
      msg: 'TemplateGrammar 模板语法',
      rawHtml: '<span style="color: red">This should be red.</span>',
      ok: true,
      isButtonDisabled: true,
      url: 'https://www.baidu.com',
      attributeName: 'href', // 动态参数
      eventName: 'click'
    }
  },
  methods: {
    doSomething () {
      console.log(this, '动态事件')
    }
  }
}
</script>
