export default [
	{path:'/map',component(resolve) {require(['./views/map.vue'],resolve)}},
	{path:'/index',component(resolve) {require(['./views/unlock.vue'],resolve)}},
	{path:'/',redirect: '/index'}
]
