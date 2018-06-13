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
							<div class="zmiti-pk" >
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
							<div class="zmiti-pk" v-show='false'>
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
								<span>{{team1.score + " ：" + team2.score}}</span>
								
							</div>

							<div class="zmiti-countdown">
								<img :src="imgs.countdownBg" alt="">
								<span>0{{(countdown/60|0)}} : {{countdown%60<10?'0'+countdown%60:countdown%60}}</span>
							</div>
						</section>
					</div>
					<div class="zmiti-talk-content" :style="{background:'url('+imgs.talkBg+') repeat-y',height:viewH-100-350+'px'}" ref='page'>
						<ul ref='ul'>
							<li style="height:100px;"></li>
							<li style="text-align:center;
							display:block">
								<img :src="imgs.logo3" alt="" style="margin:0 auto;">
							</li>
							<li v-if='i<=index' v-for='(talk,i) in talkList' :key="i" :class="{'right':talk.className}">
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
							<li style="height:50px;"></li>
						</ul>
					</div>
				</div>
			</section>
			<div class="zmiti-talk-form">
				<div>
					<input type="text" v-model="text" @focus='focus' ref='text'  @blur='blur'>
					<span :class="{'active':text.length>0}" v-tap='[send]'>发送</span>
				</div>
			</div>
			<div class="zmiti-result lt-full" v-if='result'>
				<img :src="result" alt="" @touchstart='imgStart' v-tap='[closeResult]'>
			</div>
			<div class="zmiti-tel lt-full" v-if='showTel'>
				<div>
					<img @touchstart='imgStart' :src="imgs.telBg" alt=""  >
					<input  type="number" placeholder="请输入手机号码" v-model="tel">
					<span v-tap='[closeTel]'></span>
					<div v-tap='[submit]'>确认</div>
				</div>
			</div>
			<Toast :msg='errorMsg'></Toast>
		</div>
	
	</transition>
</template>

<script>
	import './index.css';
	
	import {
	
		imgs
	
	} from '../lib/assets.js';
	import Toast from '../toast/toast'

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
				show: false,
				team1:{},
				points:"",
				team2:{},
				viewW: window.innerWidth,
				viewH: window.innerHeight,
				showMasks: false,
				barrageList:[],
				result:'',
				index:-1,
				errorMsg:"",
				showTel:false,
				tel:NaN,
				talkList:[],
				countdown:120,
				stop:false,
			}
		},
	
		components: {
			Team,
			Toast
		},
		methods: {
			focus(){
				//this.stop = true;
			},
			blur(){
				//this.stop = false;
			},
			send(){
				if(!this.text){
					return;
				}
				var s = this;

				this.$refs['text'].blur();
			
				s.talkList.splice(s.index+1,0,{
					"headimgurl":window.headimgurl || imgs.logo,
					"nickname":window.nickname||'新华社网友',
					"text": s.text,
					"image": '',
					"className":"right",
					"video":'',
					"isreverse":true,
					"videoposter":''
				});

				setTimeout(() => {
					s.scroll.refresh();
				}, 400);
			
				$.ajax({
					type:'post',
					url:'http://119.84.122.135:27701/reply/1',
					data:'{"msg": "'+s.unicode(s.text)+'"}',
					success(data){
						s.text = '';
						data = JSON.parse(data);
						if(data.code === 0){
							data.list.forEach(list=>{
								s.talkList.splice(s.index+2,0,{
									"headimgurl":list.headimgurl,
									"nickname":list.nickname,
									"text": list.text,
									"image": list.image,
									"className":"",
									"video":list.video,
									"isreverse":list.isreverse,
									"videoposter":list.videoposter
								});
								
							});
							setTimeout(() => {
								s.scroll.refresh();
							}, 500);
						}
						
					}
				})
			},
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
			unicode(str){ 
				return str.replace(/[^\u0000-\u00FF]/g,function($0){return escape($0).replace(/(%u)(\w{4})/gi,"\\u$2")}); 
			},
			closeResult(){
				this.result = '';
				this.showTel = true;
			},
			closeTel(){
				this.showTel = false;
			},
			submit(){
				var s = this;
				if(!s.tel || !/^[1][3,4,5,7,8][0-9]{9}$/.test(s.tel)){
					s.errorMsg = '请填写正确的手机号码';
					setTimeout(() => {
						s.errorMsg = '';
					}, 1000);
					return;
				}
				$.ajax({
					url:"http://h5.zhongguowangshi.com/interface/public/index.php?s=v2/user/saveh5userinfo",
					type:'post',
					data:{
						h5name:window.h5name,
						mobile:s.tel
					},
					success(data){
						if(data.getret === 0){
							s.errorMsg = '提交成功';
							setTimeout(() => {
								s.errorMsg = '';
								s.showTel = false;
							}, 1000);
						}else{
							s.errorMsg = '提交失败';
							setTimeout(() => {
								s.errorMsg = '';
								s.showTel = false;
							}, 1000);
						}
						
					}
				})
			},
			getTalk(){
				var s = this;
				/* $.getJSON("./assets/data/talk.json",(data)=>{
					if(data.code === 0){
						s.talkList = data.list;

						setTimeout(() => {
							s.scroll.refresh()
						}, 100);
					}
				}); */
				$.ajax({
					type:'get',
					url:'http://119.84.122.135:27701/reply/1',
					data:{
						
					},
					success(data){
						try {
							data = JSON.parse(data);
							console.log(data)
							if(data.code === 0){
								s.talkList = data.list;
								setTimeout(() => {
									s.scroll.refresh()
								}, 100);
							}
						} catch (error) {
							
						}
						

						
					}
				})

				
				
			},
			imgStart(e){
				e.preventDefault(); 
			},
			
		},
	
		mounted() {
			window.s = this;

			this.scroll = new IScroll(this.$refs['page'],{
				scrollbars:true,
				///bounce:false
			});

			this.getBarrage();
			this.getTalk();
			var {obserable} = this;
			obserable.on('entryTalk',(data)=>{
				this.show = true;
				this.team1 = data.team1;
				this.team2 = data.team2;
				this.points = data.points;
				var iNow = 0;
				var t = setInterval(()=>{
					this.countdown--;
					if(this.countdown<=0){
						var result1 = 0,result2 = 0;
						this.talkList.forEach((item,i)=>{
							if(item.isreverse){
								result1++;
							}else{
								result2++;
							}
						});
						if(result1>result2){
							this.result = imgs.result1
						}else{
							this.result = imgs.result2;
						}
						setTimeout(() => {
							this.closeResult();
						}, 2000);
						clearInterval(t);
					}
					iNow++;
					if(iNow%2===0){
						this.index++;
						if(this.index>=this.talkList.length-1){
							this.index  = this.talkList.length -1;
						}

						setTimeout(() => {
							if(this.viewH-100-350 - this.$refs['ul'].offsetHeight<=0){
								this.scroll.scrollTo(0,this.viewH-100-350 - this.$refs['ul'].offsetHeight,100);
							}
							this.scroll.refresh();
						}, 100);
					}
				},1000);

				 


			});
		}
	
	}
</script>