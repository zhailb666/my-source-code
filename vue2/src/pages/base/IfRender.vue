<template>
  <div class="hello">
    <h2>-----------------------{{ msg }}-----------------------</h2>
    <h3 v-if="awesome">Vue is awesome!</h3>
    <h3 v-else>Oh no 😢</h3>
    <!-- 分组渲染使用template -->
    <template v-if="ok">
      <h3>Title</h3>
      <p>Paragraph 1</p>
      <p>Paragraph 2</p>
    </template>
    <div v-if="type === 'A'">
      A
    </div>
    <div v-else-if="type === 'B'">
      B
    </div>
    <div v-else-if="type === 'C'">
      C
    </div>
    <div v-else>
      Not A/B/C
    </div>
    <h3 v-show="ok">Hello!</h3>
  </div>
</template>

<script>
export default {
  name: 'IfRender',
  data () {
    return {
      msg: 'IfRender 条件渲染',
      type: 'A',
      ok: true,
      awesome: false
    }
  }
}
</script>
<style scoped>
  .text-danger {
    color: red
  }
</style>
