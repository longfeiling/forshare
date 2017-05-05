<template>
	<div class="toast">
		<div class="mask-transparent" v-show="show"></div>
		<div class="weui-toast" :style="width:width" :class="toastClass" v-show="show" :transition="transition">
			<i class="weui-icon-toast" v-show="type !== 'text"></i>
			<p class="weui-toast-content" v-if="text" v-html="text"></p>
			<p class="weui-toast-content" v-else><slot></slot></p>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			show:{
				type:Boolean,
				default:false,
			},
			time: {
				type:Number,
				default:2000,
			},
			type: {
				type:String,
				default:'Success'
			},
			transition: {
				type: String,
				default:'fade'
			},
			width: {
				type:String,
				default: '7.6em'
			},
			text:String
		},
		computed: {
			toastClass() {
				return {
					'weui-toast-forbidden': this.type === 'warn',
					'weui-toast-cancel': this.type === 'cancel',
					'weui-toast-success': this.type === 'success',
					'weui-toast-text': this.type === 'text',
				}
			}
		}
	}
</script>