<template>
  <div class="hello">
    <h2>-----------------------{{ msg }}-----------------------</h2>
    <div class='mp' @click="mpHandler(1)" :style="{margin: '0 auto'}">
      1------哈哈哈
      <div class='mp' @click.stop="mpHandler(2)">
        2------哈哈哈
        <div class='mp' @click="mpHandler(3)">3------哈哈哈</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventBind',
  data () {
    return {
      msg: 'EventBind 事件处理、need F12'
    }
  },
  methods: {
    mpHandler: function (level) {
      console.log(level)
    }
  }
}
</script>
<style scoped>
  .text-danger {
    color: red
  }
  .mp {
    width: 100px;
    padding: 20px;
  }
</style>
