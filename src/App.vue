<template>
  <div id="app">
    <layout></layout>
  </div>
</template>

<script>
import Layout from '@/components/Layout'

export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
.el-tooltip__popper.is-dark{
  background: #f5f7fa ;
  color: #000000 ;
  width: 400px;
}

</style>
