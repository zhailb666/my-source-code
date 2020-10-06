<template>
  <div class="hello">
    <h2>-----------------------{{ msg }}-----------------------</h2>
    <div
      class="static"
      :class="{ active: isActive, 'text-danger': hasError }"
    >activeClass</div>
    <div :class="[activeClass, errorClass]">activeClass, errorClass</div>
    <div :class="[isActive ? activeClass : '', errorClass]">activeClass, errorClass</div>
    <div :style="styleObject">activeClass, errorClass</div>
  </div>
</template>

<script>
export default {
  name: 'ClassAndStyle',
  data () {
    return {
      msg: 'ClassAndStyle Class与Style绑定',
      isActive: true,
      hasError: false,
      activeClass: 'active',
      errorClass: 'text-danger',
      styleObject: {
        color: 'red',
        fontSize: '13px'
      }
    }
  }
}
</script>
<style scoped>
  .text-danger {
    color: red
  }
</style>
