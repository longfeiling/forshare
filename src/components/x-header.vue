<template>
	<div class="header">
		<div class="header-left">
			<a class="header-back" @click.preventDefault v-show="leftOptions.showBack" :transition="transition" @click="onClickBack">{{leftOptions.backText}}</a>
			<slot name="left"></slot>
		</div>
		<h1 class="header-title" @click="$emit('on-click-title')"><span v-show="title" :transition="transition"></span><slot></slot></h1>
		<div class="header-right">
			<a class="header-more" @click.preventDefault @click="$emit('on-click-more')" v-if="rightOptions.showMore"></a>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			leftOptions: {
				type: Object,
				default() {
					return {
						showBack: true,
						backText: 'Back',
						preventGoBack: false
					}
				}
			},
			title: String,
			transition: String,
			rightOptions: {
				type: Object,
				default() {
					return {
						showMore: false
					}
				}
			}
		},
		methods: {
			onClickBack() {
				if(this.leftOptions.preventGoBack) {
					this.$emit('on-click-back')
				}else{
					history.back();
				}
			}
		}
	}
</script>

<style type="text/css">
	.header{
		position: relative;
		padding: 3px 0;
		box-sizing: border-box;
		background-color: #fff;
		box-shadow:0 0 5px #888;
	}
	.header-title,.header h1{
		margin: 0 88px;
		margin-left: 100px;
		line-height: 40px;
		text-align: center;
		height: 40px;
		font-size: 16px;
		font-weight: 400;
		width: auto;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #000;
	}
	.header .header-title > span{
		display: inline-block;
	}
	.header .header-left,.header .header-right{
		position: absolute;
		top: 14px;
		display: block;
		font-size: 14px;
		line-height: 21px;
		color: #000;
	}
	.header .header-left a,.header .header-left button,.header .header-right a,.header .header-right button {
		float: left;
		margin-right: 8px;
		color: #000;
	}
	.header .header-left a:active,.header .header-left button:active,.header .header-right a:active,.header .header-right button:active {
		opacity: .5;
	}
	.header .header-left{
		left: 18px;
	}
	.header .header-left .header-back{
		padding-left: 16px;
	}
	.header .header-left .header-back:before{
		content:"";
		position: absolute;
		display: block;
		top: 2px;
		left: 0;
		width: 12px;
		height: 12px;
		border:1px solid #000;
		border-width: 1px 0 0 1px;
		margin-left: 3px;
		margin-top: 1px;
		transform: rotate(315deg)
	}
	.header .header-right{
		right: 15px;
	}
	.header .header-right .header-more:after{
		content: "\2022\0020\2022\0020\2022\0020";
  		font-size: 16px;
	}
	.header-fade-in-right-enter {
	  animation: fadeinR .5s;
	}
	.header-fade-in-left-enter {
	  animation: fadeinL .5s;
	}
	@keyframes fadeinR{
	  0%{opacity:0;transform:translateX(80px);}
	  100%{opacity:1;transform:translateX(0);}
	}
	@keyframes fadeinL{
	  0%{opacity:0;transform:translateX(-80px);}
	  100%{opacity:1;transform:translateX(0);}
	}
</style>