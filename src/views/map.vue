<template>
	<div class="wrap">
		<x-header :left-options="{showBack:true}">共享单车</x-header>
		<div id="container">地图</div>
		
		<router-link :to="{  path: '/unlock'}">
			<div class="big-btn">立即用车</div>
		</router-link>
	</div>
</template>

<script type="text/javascript">
import xHeader from '../components/x-header.vue'
	export default{
		mounted(){
			this.getLocation();
		},
		data() {
			return {

			}
		},
		methods: {
			getLocation() {
				var options = {
					enableHighAccuracy:true,
					maximumAge:1000
				};
				if(navigator.geolocation) {  //浏览器支持geolocation
					var geolocation = new BMap.Geolocation();
					geolocation.getCurrentPosition(this.onSuccess,this.onError,options);
				}else{
					alert("浏览器不支持geolocation")
				}
			},
			onSuccess(position) {
				var longitude = position.longitude;  //经度
				var latitude = position.latitude;  //纬度
				var map = new BMap.Map("container");

				var point = new BMap.Point(longitude,latitude);
				var gc = new BMap.Geocoder();

				map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别 

				var mk = new BMap.Marker(position.point);
					map.addOverlay(mk);
					map.panTo(position.point);


				gc.getLocation(point,function(rs) {

					var addComp = rs.addressComponents;
					console.log(addComp.province + ","+addComp.city+","+addComp.district+","+addComp.street);
				});
			},
			onError(error) {
				console.log("error..")
				switch(error.code) {
					case 1:  alert("位置服务被拒绝"); break;
					case 2:  alert("暂时获取不到位置信息"); break;
					case 3:  alert("获取信息超时"); break;
					case 4:  alert("未知错误"); break;
				}
			}
		},
		components : {
			xHeader
		}
	}
</script>

<style>
	html{height: 100%}
	.wrap,body{height: 100%;margin:0;padding:0;}
	#container{height: 100%;}
	.wrap header{
    display: -webkit-flex;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    box-sizing: border-box;
    background-color: #fff;
    position: relative;
    box-shadow: 0 0px 5px #888;
}
.big-btn{
	position: absolute;
	left: 50%;
	bottom: 10px;
	width: 83px;
	height: 83px;
	border-radius: 50%;
	margin-left: -42px;
	color: #f3e815;
	background-color: #010101;
	line-height: 83px;
	text-align: center;
}
</style>
