import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routerconfig from './router'

Vue.use(VueRouter)

console.log(routerconfig)

const router = new VueRouter({
	mode:'history',
	routes:routerconfig
})

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
