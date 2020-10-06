<template>
  <div class="hello">
    <h2>-----------------------{{ msg }}-----------------------</h2>
    <div v-for="(value, name) in object" v-bind:key="name">
      <div v-if="name!='age'">{{ name }}: {{ value }}</div>
    </div>
    <div v-if="list.length" v-for="item in list" v-bind:key="item">
      {{item}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForRender',
  data () {
    return {
      msg: 'ForRender 列表渲染',
      object: {
        name: 'zlb',
        age: '22',
        sex: 'man'
      },
      list: [1, 2, 3, 4, 5, 6]
    }
  }
}
</script>
<style scoped>
  .text-danger {
    color: red
  }
</style>
