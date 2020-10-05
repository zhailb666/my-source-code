<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <HelloWorld src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from '@/pages/HelloWorld'
export default {
  name: 'PartialRegistration',
  components: {
    HelloWorld
  },
  data () {
    return {
      msg: '局部注册组件使用(引用HelloWorld)'
    }
  }
}
</script>
