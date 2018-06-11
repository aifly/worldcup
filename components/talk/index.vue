<template>
	<transition name='main'>
	
		<div class="lt-full zmiti-talk-main-ui " :class="{'show':show}"  ref='page'>
			<section>
				<div class="zmiti-talk-title">
					<img :src="imgs.talkTitle" alt="">
				</div>
				<div class="zmiti-talk-content" :style="{background:'url('+imgs.talkBg+') repeat-y'}"></div>
			</section>
		</div>
	
	</transition>
</template>

<script>
	import './index.css';
	
	import {
	
		imgs
	
	} from '../lib/assets.js';

	import IScroll from 'iscroll';
	
	import $ from 'jquery';
	
	import zmitiUtil from '../lib/util';

	import Team from '../team/index';
	export default {
	
		props: ['obserable', 'pv', 'randomPv', 'nickname', 'headimgurl'],
	
		name: 'zmitiindex',
	
		data() {
	
			return {
				imgs,
				showTeam: false,
				showQrcode: false,
				show: true,
				viewW: window.innerWidth,
				viewH: window.innerHeight,
				showMasks: false,
			}
		},
	
		components: {
			Team
		},
		methods: {
			restart() {
				window.location.href = window.location.href.split('?')[0];
			},
			getBarrage(){//获取弹幕
				$.getJSON("./assets/images/barrage.json",(data)=>{

				});
			},
			getTalk(){
				$.getJSON("./assets/images/talk.json",(data)=>{
					
				});
			}
			
		},
	
		mounted() {
			window.s = this;

			this.scroll = new IScroll(this.$refs['page'],{
				scrollbars:true,
				bounce:false
			})

		}
	
	}
</script>