import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routerconfig from './router'
import vueResource from 'vue-resource'
// import {alertPlugin,ToastPlugin} from 'vux'

Vue.use(VueRouter)
/*Vue.use(alertPlugin)
Vue.use(ToastPlugin)*/

const router = new VueRouter({
	mode:'history',
	routes:routerconfig
})

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})

Vue.use(vueResource)
Vue.http.options.emulateJSON = false
Vue.http.options.root = 'http://10.30.75.217:8080'


Vue.http.interceptors.push({
	request: function(request) {
		return request
	},
	response: function(response) {
		return response
	}
})

