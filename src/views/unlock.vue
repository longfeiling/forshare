<template>
	<div class="wrap">
		<x-header :left-options="{showBack:true}" :right-options="{showMore:true}">手动解锁</x-header>
	    <div class="main">
	        <div class="car-num">

	        </div>
	        <!-- <p class="money-dec">计费说明：1元/小时</p> -->
	        <div class="input">
	        	<input type="text" class="text" name="" id="text" v-model="value" />
	            <!-- <div type="text" class="text" id="text" data-content="">{{value}}</div> -->
	            <button class="btn" id="submitBtn" @click="submitFn" :class="value==''?'':'active'"></button>
	        </div>
	        <p class="input-dec">输入车牌号,获取解锁码</p>

	    </div>
	    <!-- <footer>
	       <table width="100%" border="1" cellspacing="0" cellpadding="0">
	                   <tr>
	                       <td class="number" @click="numberFn">1</td>
	                       <td class="number" @click="numberFn">2</td>
	                       <td class="number" @click="numberFn">3</td>
	                        <td></td>
	                   </tr>
	                   <tr>
	                       <td class="number" @click="numberFn">4</td>
	                       <td class="number" @click="numberFn">5</td>
	                       <td class="number" @click="numberFn">6</td>
	                        <td id="del" @click="delFn"></td>
	                   </tr>
	                   <tr>
	                       <td class="number" @click="numberFn">7</td>
	                       <td class="number" @click="numberFn">8</td>
	                       <td class="number" @click="numberFn">9</td>
	                       <td rowspan="2" @click="submitFn" :class="value==''?'':'active'">确认</td>
	                   </tr>
	                   <tr>
	                       <td></td>
	                       <td class="number">0</td>
	                       <td></td>
	                        
	                   </tr>
	       </table>
	    </footer> -->

	    <toast v-model="toast.show" type="text" is-show-mask :text="toast.text"></toast>
	    <confirm v-model="confirm1.show" title=""
	     @on-cancel="onCancel1" 
	     @on-confirm="onConfirm1" 
	     confirm-text="正确"
	     cancel-text="错误"
	     :content="confirm1.text">
	    </confirm>
	    <confirm v-model="confirm2.show" title="" @on-cancel="onCancel2" @on-confirm="onConfirm2">
	    	<p>{{confirm2.text}}</p>
	    	<input type="text" name="psd" placeholder="请输入密码" v-model="psd" />
	    </confirm>
	</div>
</template>
<script type="text/javascript">
import xHeader from '../components/x-header.vue'
import { Toast,Alert,Confirm  } from 'vux'
var url = require('aUrl');
	export default {
		data() {
			return {
				value:'',
				psd:'',
				alert:{
					show:false,
					content:''
				},
				confirm1:{
					show:false,
					text:''
				},
				confirm2:{
					show:false,
					text:''
				},
				toast:{
					show:false,
					text:''
				},
				id: '' //单车的编号
			}
		},
		mounted(){
			this.getLocation();
		},
		methods: {
			submitFn() {
				let self = this;
				console.log("process.env.NODE_ENV==="+process.env.NODE_ENV)
				var location = JSON.parse(localStorage.getItem("location"));
				self.$http.post(url + '/shareBicycle/find',{
					"area":location.district,
					"city":location.city,
					"latitude":location.latitude,
					"longitude":location.longitude,
					"province":location.province,
					"share_code":self.value,
				}).then(function(res) {
					if(res.body.code == 0) {
						let psd = res.body.data.password;
						self.id = res.body.data.id;
						if(psd === null) {
							self.confirm2.show = true;
							self.confirm2.text = '暂时没有该辆车的密码，请用ofo扫描二维码获取密码并输入';
						}else{
							self.psd = psd;
							self.confirm1.text = "这辆车的密码是"+'<span class="yellow">'+psd+'</span>';
							self.confirm1.show = true;
						}
						self.value = '';
					}
				})
			},
			onShow() {
				let self = this;
				self.hidetag = true;
			},
			onCancel1() {
				let self = this;
				self.$http.post(url + '/shareBicycle/passwordIsCorrect',{
					"id":self.id,
					"isCorrect":false,
					"password":self.psd,
				}).then(function(res) {
					if(res.body.code == 0) {
						self.psd = ''
						self.confirm2.show = true;
						self.confirm2.text = '请输入正确的密码';
					}else{
						self.toast.show = true;
						self.toast.text = res.body.msg;
					}
				})
			},
			onConfirm1() {
				let self = this;
				self.$http.post(url + '/shareBicycle/passwordIsCorrect',{
					"id":self.id,
					"isCorrect":true,
					"password":self.psd,
				}).then(function(res) {
					if(res.body.code == 0) {
						self.toast.show = true;
						self.toast.text = res.body.msg;
					}else{
						self.toast.show = true;
						self.toast.text = res.body.msg;
					}
				})
			},
			onCancel2() {},
			onConfirm2() {
				let self = this;
				self.$http.post(url + '/shareBicycle/setPassword',{
					"id":self.id,
					"password":self.psd,
				}).then(function(res) {
					if(res.body.code == 0) {
						self.toast.show = true;
						self.toast.text = res.body.msg;
					}else{
						self.toast.show = true;
						self.toast.text = res.body.msg;
					}
					self.value = '';
				})
			},
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

				/*map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别 

				var mk = new BMap.Marker(position.point);
					map.addOverlay(mk);
					map.panTo(position.point);*/


				gc.getLocation(point,function(rs) {

					var addComp = rs.addressComponents;

					var location = {
						longitude:position.longitude,
						latitude:position.latitude,
						province:addComp.province,
						city:addComp.city,
						district:addComp.district,
					};
					localStorage.setItem("location",JSON.stringify(location))
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
		components: {
			xHeader,Toast,Alert,Confirm 
		}
	}
</script>

<style>
	.wrap {
	    width: 100%;
	    height: 100%;
	    overflow-x: hidden;
	    background-color: #F6F6F6;
	}
	/*头部*/
	
	.wrap header {
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
	
	.wrap header::after {
	    content: '';
	    display: block;
	    position: absolute;
	    border: 1px solid #ccc;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    transform-origin: 100% 100%;
	    transform: scaleY(.5);
	}
	
	.wrap header a.back {
	    color: #10AEFF;
	    display: block;
	    position: relative;
	    margin-left: 40px;
	    font-size: 18px;
	}
	
	.wrap header a.back::before {
	    content: '';
	    display: block;
	    width: 25px;
	    height: 25px;
	    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABfElEQVRoQ+3ZTU7CQBQH8PdIWNsjyKJdewS5Ad4AltCVh0GX4gnUE8gRdEtM9AQwW13wDBNLTG1M6PuYmWS6bsv/9958pANC4hcmnh8yIHQHcwdyB5gVCDKEitv3czcffTCz+8fNAcVyMx0g3u2JZq6uVlyEKaAJ34TeI4zdvFxzEGaAdngAut8uqiknvNkQ0gpvAtAMrw7QDq8KsAivBmiHJ4KnXV1OuBO263nxVahYbi4Q8BkRisMPEtArfQ4v3fXIRQ+wDi86hEKEFwOECi8CCBmeDQgdngWIIXxvQCzheQDENQKc+bWe6IW+hmOttf6//aP3Rua7EAGiN+BQlRgQLEAMCDYgNEIEEBIhBgiFEAWEQIgDPOLmbTIAemjWbwJ43C3Kq+i/B34H/PNJSbTa1tVMGqHSgSakBUIV8DMn/FHisfLCnVAHaCNMAJoIM0AXIqnD3fbETvJ4/YhI+Q+OpPYB6bBd7zOdxBqgDNCo6invzB04pVoa934DNIkbQDw/picAAAAASUVORK5CYII=) center no-repeat;
	    background-size: cover;
	    position: absolute;
	    left: -21px;
	}
	
	.wrap header a.saoma {
	    width: 25px;
	    height: 25px;
	    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACmUlEQVRoQ+1WS3LaUBDsIbLxzoITQFXE1twg5gbOCUyWiIXhBMEngCwkliYniH0C4xMEbxFVkAuAvAug0qQEgZKEfq63sHE9lmh63nT3qJ8IR/6jI58fksBbOygdkA4IKiBXSFBAYbh0QFhCwQbSAUEBheHSAWEJBRtIBwQFFIZ/bAdUY1wF0TmWyrPdLtuvlUs1rS8exta1p1dju1MVeecCzC92szKKw0c6oJqTa4LbIVBpB2Tgnklp243yLGkYtTtVc2fODbtoEUHd1zIP3NVJO02IDf503QVRfX82w6YcevOGdhs++4BA0Rjf+cF+ADNsBtfiFPEOp9P1IxFVo0gy84hXJ7U4Elu8Mw0QDw4wmDcr3/x/BQio5uQqB/6VpDCDZwu9Uo6qKRpWB4TvyevCP+d6Za+uv7ZgWo8EXCbhXaBt61pvVxMgUDCtIQGbvU1uQl9t/fN9uKZgWItY9XzF7lIphF1Q+9NSjp1p2tlhAQMEiqbFaQ02zxm386bW8dd6L3yO6HcWvEuo2Q1tGMBncH9XP9e1/dzvh4AxrueI7rIIEEugYI5HBLpIa+IiZoVMyybgPBVPSjmcZlkdZMafRVPbp2PwJc6gQriBf9iiMemB+CYxBBgPi6Z2FVWT6R0Mre9hjJrjAUDXkTEIvDDzZWKM5tfDOBfZwy+VUmyMGuMqEXlBEukig58XeiUQ0ZEXmReHTGj5GzHwxMytpFvRI725iPLrXlgEZjzwSqmnXmRbEr2DNGT64a4+dcL4xG8htW/9z2RllnYDhx3ziODM2ar1VxmlDX6A709LgLPd9QT8x/6YS0uT9/BcOvDWLkgHpAOCCsgVEhRQGC4dEJZQsIF0QFBAYbh0QFhCwQbSAUEBheFH78A/uDcPQHfpFIoAAAAASUVORK5CYII=);
	    background-size: cover;
	    margin-right: 20px;
	}
	/*中部*/
	
	.wrap .main {
	    width: calc(100% - 45px);
	    box-shadow: 0 0 10px #ccc;
	    margin: 0 auto;
	    box-sizing: border-box;
	    margin-top: 5rem;
	    background-color: #fff;
	    display: -webkit-flex;
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	    padding: 10px;
	    border:1px solid #ccc;
	}
	.main div:not(.car-num):not(.text), .main p{
	    margin-top: 30px;
	}
	.main .car-num {
	    width: 288px;
	    height: 135px;
	    background: url(../assets/num.png) no-repeat;
	    background-position: center center;
	    background-size: cover;
	}
	.main.psd-wrap .car-num{background-image: url(../assets/psd.png);}
	.main .money-dec{
	    background-color: #eee;
	    padding: 0 10px ;
	    border-radius: 70px;            
	}
	.main .input{
	 width: 100%;
	}
	.main .input .text, .main .input .btn{
	    display: inline-block;
	    vertical-align: middle;
	    /*margin-left: 10px;*/
	}
	 .main .input button.active{
	    background-color: #ffd500;
	}
	.main .input .text{
	    width:65%;
	    height: 60px;
	    border: 2px solid #ffd500;
	    text-align: center;
	    color:black;
	    line-height: 60px;
	    position: relative;
	    font-size: 30px;
	}
	/*光标*/
	.main .input .text::before{
	    content: attr(data-content);
	}
	
	.main .input .text::after{
	    content: '';
	    border-right: 2px solid #ffd500;
	    height: 50%;
	    opacity: 1;
	    animation: focus .7s forwards infinite;
	
	}
	/*闪烁动作*/
	@keyframes focus{
	    from{
	        opacity: 1;
	    }to{
	        opacity: 0;
	    }
	}
	.main .input .btn{
	    width: 60px;
	    height: 60px;
	     outline: none;
	    border: none;
	    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABY0lEQVRoQ+2XYW3DQAyFXxkUyhisFIpgKwMHQQvBQ7COwRhMhTAIYzAGqSylUlQ1iRPf1Y7k+5s7531+vjvfBisfm5XrRwJ4O5gOpAPGDGQJGRNoXp4OmFNoDODiABEdAXww879R//NvYiLaAfgB8M3M+9UBiGAiegfwCeDMzAcLhEsJlYRwAygF4QpQAsIdwAoRAqCDOAGQ43XWxg4D0EGcAbzNgQgFsAQiHMBciFGApmleLZeMZW3btgzgpWs5aCjWKAARtRYRhdZemFnaj4djCmBwYSFxY2Gk3ZANLU3fMgeeIPLhL3q90hczC8jgCLeJe+JHS+dGFAqgJ/4XwE7zXggDsES8uBACYKn4EAAW8e4ARCQXlTwv/7Q1f38cuZVQCfFuDpQS7wJQUrwXwBaANGqkOeenugG3PTAlTPs9AbSZqjUvHaiVWW3cdECbqVrz0oFamdXGTQe0mao1b/UOXAHwUYgxdDnt4wAAAABJRU5ErkJggg==) no-repeat center;
	    background-color: #eee;
	    
	    
	}
	.main .input-dec{
	    
	}
	footer table{
	    width: 100%;
	    height: 215px;
	    position: fixed;
	    bottom: 0;
	    left: 0;
	    right: 0; 
	    text-align: center;
	    border: 1px solid #dedfe2;
	    border-collapse: collapse;
	    background-color: #fff;
	    
	}
	footer table tr td{
	    width: 25%;
	}
	footer table tr:last-child td:nth-child(2n+1){
	    background-color: #f6f6f6;
	}
	footer table tr:nth-child(3) td:last-child{
	    background-color: #dedfe2;
	}
	footer table tr:first-child td:last-child{
	    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABAUlEQVRYR+2WyxGCMBRFDwtbsAtbcGUvakVKL65swS5owY1zmSHDJ4SQD3HB2wBDmHdycyBUFK6qcH92gD2Bv0jgCVwLvQ21EjgAL+C8McQbuHRLcAQ+gI5bVAOcgKbvgBJQEkokZ301c0AJTD5EN+CRsztwB+RdW7a3IKeUNaBJmrIB5JKylQ7QEjgBdDO1lEa68fK6PkSppBxItwZAY1NIOZBuLYDGx0g5kS4EIFRKq3QhACFSzkoXCqDnfKV0ShcD4CulU7pYgCUpF6VLATAnpZd0KQBsUnpLlwqgL6XOzfY6brB0HftP2O1sZntdapgygbW9rONjE4iG2AGKJ/ADuUswvmERhx0AAAAASUVORK5CYII=) no-repeat center ;
	    background-size: 20px 20px;
	}
	footer table tr:nth-child(2) td:last-child{
	    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABG0lEQVRYR9WX0Q3CMAxErxPAKIwAm8BksAmMwCh0A2SpQcFNk7smKKVSvxrfvZjYMQM6P0Nnf2wW4ADA3lujDJ0BPKf3SzKVATO+A9gDuDSAMPMrgBeAk4fwALF5IK2BCOZBawbhAXxADQSllfoJqMDC2aA1lqqAFkiASLG5MpSEJhA5ptQHFEFl7SdxJQBbyAgza5LHhgEoQdh3q3P/UOXLAuQgUjujzC1QAWAhaPM1ACUIyfwvAZZOe3wOpCwoZ4Axl+8OFiBX5z8vQ6bJMGtWNSJFWFlLteI1gnLMJq9jeRc1M8HmRjIbSh8AdtGupMbisuGzOQI4xpPx0lgeIGrMA0uAmJnn7oKuf0wKA2/bz2wrbusaqXUHeAOPTFwh/22d1gAAAABJRU5ErkJggg==) no-repeat center;
	    background-size: 20px 20px;
	}

	.main.hide {display: none}
	input[name="psd"]{
		padding:8px 12px;
	}
	.yellow{
		color:#ffd500;
		font-size: 20px;
	}
</style>
