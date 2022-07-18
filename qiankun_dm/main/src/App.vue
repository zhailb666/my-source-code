<!--
 * @Author: your name
 * @Date: 2022-07-17 17:10:52
 * @Description: file content
-->
<template>
<div>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/> 
  </div>
   <div id="container"></div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
