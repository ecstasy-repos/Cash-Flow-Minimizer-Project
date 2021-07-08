<template>
  <v-app id="app">
    <v-main>
      <v-container fluid>
         <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
//  import HelloWorld from './components/HelloWorld.vue'
//  import Graph from './components/Graph.vue'

export default {
  name: 'App',
  components: {
    // 'HelloWorld' : HelloWorld,
    // 'Graph' : Graph
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
