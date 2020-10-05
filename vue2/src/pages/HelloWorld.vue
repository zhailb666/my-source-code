<template>
  <div class="hello">
    <h1>{{ msg }}123456</h1>
    <GlAvatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></GlAvatar>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
