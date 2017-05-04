<template>
	<div class="wrap">
		<x-header :left-options="{showBack:true}" :right-options="{showMore:true}">手动解锁</x-header>
	   <!--  <header>
	       <a href="javascript:;" class="back" @click="back">返回</a>
	       <h3>共享单车</h3>
	       <a href="javascript:;" class="saoma"></a>
	   </header> -->
	    <div class="main">
	        <div class="car-num">

	        </div>
	        <p class="money-dec">计费说明：1元/小时</p>
	        <div class="input">
	            <div type="text" class="text" id="text" data-content="">{{value}}</div>
	            <button class="btn" id="submitBtn" @click="submitFn" :class="value==''?'':'active'"></button>
	        </div>
	        <p class="input-dec">输入车牌号,获取解锁码</p>

	    </div>
	    <footer>
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
                   <td rowspan="2" @click="numberFn">确认</td>
               </tr>
               <tr>
                   <td></td>
                   <td class="number">0</td>
                   <td></td>
                    
               </tr>
	       </table>
	    </footer>
	</div>
</template>
<script type="text/javascript">
import xHeader from '../components/x-header.vue'
	export default {
		data() {
			return {
				value:''
			}
		},
		mounted() {},
		methods: {
			submitFn() {},
			back() {
				history.go(-1);
			},
			delFn() {
				let self = this;
				self.value = self.value.slice(0,self.value.length-1)
			},
			numberFn(event) {
				let self = this;
				self.value += event.target.innerText;
			}
		},
		components: {
			xHeader
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
	    margin-top: 25px;
	    background-color: #fff;
	    display: -webkit-flex;
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	    padding: 10px;
	}
	.main div:not(.car-num):not(.text), .main p{
	    margin-top: 30px;
	}
	.main .car-num {
	    width: 288px;
	    height: 135px;
	    background: url(https://common.ofo.so/newdist/daa967f224530707a6fec557d033ff2e.png) no-repeat;
	    background-position: center center;
	    background-size: cover;
	}
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
</style>
