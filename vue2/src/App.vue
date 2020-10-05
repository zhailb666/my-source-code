<template>
  <div id="app">
    <div class='left'>
      <router-view/>
    </div>
    <div class='right'>
      <img src="./assets/logo.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
}
.left {
  flex: 1
}
.right {
  width: 200px
}
</style>
