import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import { routes } from "./Routes/routes";

export const eventBus = new Vue();

Vue.use(VueRouter);


const router = new VueRouter({
  routes,
  mode : 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
