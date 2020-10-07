<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <GlAvatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></GlAvatar>
    <RenderFunction1 @click.stop='log(1)'>
      111
    </RenderFunction1>
    <RenderFunction2>
      fn2
    </RenderFunction2>
  </div>
</template>

<script>
import RenderFunction1 from './RenderFunction1'
import RenderFunction2 from './RenderFunction2'
export default {
  components: {
    RenderFunction1,
    RenderFunction2
  },
  name: 'Base',
  data () {
    return {
      msg: '复用组合'
    }
  },
  methods: {
    log: function (params) {
      console.log(params)
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
