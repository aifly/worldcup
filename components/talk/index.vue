<template>
	<transition name='main'>
	
		<div class="lt-full zmiti-talk-main-ui " :class="{'show':show}">
			<section  class=""  :style="{height:viewH-100+'px',position:'relative',overflow:'hidden'}">
				<div>
					<div class="zmiti-talk-title">
						<img :src="imgs.talkTitle" alt="">
						<div class="zmiti-barrage" v-for='(barrage,i) in barrageList' :key='i'>
							<span>{{barrage.name}} : </span>
							<span>{{barrage.content}}</span>
						</div>

						<section class="zmiti-talk-pk-C">
							<div class="zmiti-pk">
								<div>
									<img :src="imgs.team4" alt="">
									<span>{{team1.teamname}}</span>
								</div>
								<div>
									<img :src="imgs.logo1" alt="">
								</div>
								<div>
									<img :src="imgs.team3" alt="">
									<span>{{team2.teamname}}</span>
								</div>
							</div>
							<div class="zmiti-pk">
								<div>
									<img :src="imgs.team1Ico" alt="">
									<span></span>
								</div>
								<div>
									<img :src="imgs.pk" alt="">
								</div>
								<div>
									<img :src="imgs.team2Ico" alt="">
									<span></span>
								</div>
							</div>
							<div class="zmiti-talk-score">
								<span v-if='false'>{{points.split('-')[0] + " ：" + points.split('-')[1]}}</span>
								3:0
							</div>

							<div class="zmiti-countdown">
								<img :src="imgs.countdownBg" alt="">
								<span>00 : {{countdown}}</span>
							</div>
						</section>
					</div>
					<div class="zmiti-talk-content" :style="{background:'url('+imgs.talkBg+') repeat-y',height:viewH-100-584+'px'}" ref='page'>
						<ul>
							<li v-for='(talk,i) in talkList' :key="i">
								<div>
									<img class="zmiti-headimg" :src="talk.headimgurl" alt="">
									<span>{{talk.nickname}}</span>
								</div>
								<div>
									<div v-if='talk.text'>{{talk.text}}</div>
									<div v-if='talk.text' style="opacity:0;padding:0;">{{talk.text}}</div>
									<div v-if='talk.image' class="zmiti-talk-img">
										<img  :src="talk.image" alt="">
									</div>
									<div v-if='talk.videoposter' class="zmiti-talk-img">
										<img  :src="talk.videoposter" alt="">
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</section>
			<div class="zmiti-talk-form">
				<div>
					<input type="text" v-model="text">
					<span :class="{'active':text.length>0}">发送</span>
				</div>
			</div>
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
				text:'',
				showTeam: false,
				showQrcode: false,
				show: true,
				team1:{},
				points:"",
				team2:{},
				viewW: window.innerWidth,
				viewH: window.innerHeight,
				showMasks: false,
				barrageList:[],
				index:-1,
				talkList:[],
				countdown:30
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
				var s = this;
				$.getJSON("./assets/data/barrage.json",(data)=>{
					if(data.code === 0){
						s.barrageList = data.list;
					}
				});
			},
			getTalk(){
				var s = this;
				$.getJSON("./assets/data/talk.json",(data)=>{
					if(data.code === 0){
						s.talkList = data.list;

						setTimeout(() => {
							s.scroll.refresh()
						}, 100);
					}
				});
				
			}
			
		},
	
		mounted() {
			window.s = this;

			this.scroll = new IScroll(this.$refs['page'],{
				scrollbars:true,
				bounce:false
			});

			this.getBarrage();
			this.getTalk();
			var {obserable} = this;
			obserable.on('entryTalk',(data)=>{
				this.show = true;
				console.log(data);
				this.team1 = data.team1;
				this.team2 = data.team2;
				this.points = data.points;


			});
		}
	
	}
</script>