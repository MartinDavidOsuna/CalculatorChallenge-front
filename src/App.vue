<template>
  <div id="app">
    <div class="container" style="max-width:800px">
      <div class="row"> 
        <router-view/>
        
       
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: 'App',
  
  computed: {
    pageTitle() {
      return 'Calculator Challenge'
    }
  },

  mounted() {
    document.title = this.pageTitle
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}


</style>
