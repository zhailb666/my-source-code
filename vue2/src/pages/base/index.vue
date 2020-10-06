<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <GlAvatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></GlAvatar>
    <TemplateGrammar/>
    <ComputedAndWatch/>
    <ClasAndStyle/>
    <IfRender/>
    <ForRender/>
    <EventBind/>
    <FormBind/>
  </div>
</template>

<script>
import TemplateGrammar from './TemplateGrammar'
import ComputedAndWatch from './ComputedAndWatch'
import ClasAndStyle from './ClasAndStyle'
import IfRender from './IfRender'
import ForRender from './ForRender'
import EventBind from './EventBind'
import FormBind from './FormBind'
export default {
  components: {
    TemplateGrammar,
    ComputedAndWatch,
    ClasAndStyle,
    IfRender,
    ForRender,
    EventBind,
    FormBind
  },
  name: 'Base',
  data () {
    return {
      msg: 'Vue基础'
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
