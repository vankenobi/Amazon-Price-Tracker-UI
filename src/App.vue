<template>
<div>
  <SideBar></SideBar>
  <HeaderVue></HeaderVue>
  <router-view id="app"></router-view> 
</div>
  
</template>

<script>
import SideBar from './components/SideBar';
import HeaderVue from './components/Header.vue';
export default {
  name: 'app',
  components : {
    SideBar,
    HeaderVue
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
  margin-top: 60px;
}

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
