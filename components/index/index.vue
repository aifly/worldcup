<template>
	<div   class="lt-full zmiti-index-main-ui " :style="{background:'url('+imgs.indexBg+') no-repeat center bottom',backgroundSize:'cover'}"  :class="{'show':show}">
		<transition name='index'>
			<div class="zmiti-index lt-full" v-if='!showIndexMask'>
				<div class="zmiti-title">
					
						<img :src="imgs.indexTitle" alt="">
						<div class="zmiti-vs">
							<div>
								<img :src="imgs.team1" alt="">
								<span>{{team1.teamname}}</span>
							</div>
							<div>
								<img :src="imgs.vs" alt="">
							</div>
							<div>
								<img :src="imgs.team2" alt="">
								<span>{{team2.teamname}}</span>
							</div>
						</div>
						<div class="zmiti-perosn">
							<div><img :src="imgs.xiaoxin" alt=""></div>
							<div class="zmiti-score">
								<section>
									<img :src="imgs.xiaoxinTextBg" alt="">
									<div>小新预测莫斯科中央陆军会赢</div>
									<div>比分{{team1.score}}:{{team2.score}}</div>
								</section>
							</div>
						</div>
				</div>
				<div class="zmiti-index-bottom">
					<div class="zmiti-index-btns">
						<div>认 同</div>
						<div>PK小新</div>
					</div>
				</div>
				<canvas :width="viewW" height="900" ref='canvas'>

				</canvas>
			</div>
		</transition>
	</div>
</template>

<script>
	import './index.css';
	import {imgs} from '../lib/assets.js';
	import zmitiUtil from '../lib/util';
	import Point from './point';
	export default {
		props:['obserable','nickname','pv'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				pointW:0,
				pointH:0,
				points:[],
				team1:{},
				team2:{},
				show:true,
				showIndexMask:false,
				showMasks:false,
				transX:-200,
				showVideo:false,
				viewW:window.innerWidth,
				fullscreen:true,
				vidoeUrl:'./assets/video/index1.mp4'
			}
		},
		components:{
		},
		
		methods:{

			imgStart(e){
				e.preventDefault(); 
			},

			entry(){
				
				var {obserable} = this;
				this.showIndexMask = true;
				this.showVideo = true;

				setTimeout(()=>{
					this.$refs['video'].addEventListener('play',()=>{
		 				obserable.trigger({
		 					type:"toggleBgMusic",
		 					data:false
		 				})
		 			})

		 			this.$refs['video'].addEventListener('ended',()=>{
		 				/* obserable.trigger({
		 					type:"toggleBgMusic",
		 					data:true
						 }); */
						 
						 obserable.trigger({
							 type:'entryIntro'
						 });
		 			})

		 			/* this.$refs['video'].addEventListener('pause',()=>{
		 				this.show && this.$refs['video'].play()	
					 }) */
					 
					 
					this.$refs['video'].play()
				},200)
			},

			initPoints(){

				var canvas = this.$refs['canvas'];
				var context = canvas.getContext('2d');

				var width = canvas.width,
					height = canvas.height;
				var img = new Image();
				img.onload = ()=>{
					for(var i = 0 ;i<100;i++){
						var p = new Point({
							img,
							context,
						})
						this.points.push(p);
					}
				}
				img.src = imgs.point;

				var animationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame,
					m = Math;

				var render = ()=>{
					if(width<=0){
						width = canvas.width,
						height = canvas.height;
					}
					context.clearRect(0,0,width,height);

					this.points.map((point,i)=>{
						point.angle += point.speed;
						//point.angle = (point.angle | 0)
						point.angle %= 360;
						point.x += m.sin(point.angle/180*m.PI)*point.speedX;

						point.y -= 1;
						if(point.defaultY  -  point.y  >  point.maxHeight){
							point.y = point.defaultY
						}
						point.update();
					});
					!this.showIndexMask && animationFrame(render);
				}
				
				render()


			},
			getBaseData(){
				var s = this;
				$.getJSON("./assets/data/base.json",(data)=>{
					if(data.code === 0){
						s.team1 = data.basedata.teams[0];
						s.team2 = data.basedata.teams[1];
					}
					console.log(data);
				});
			}
			
		},
		mounted(){
			this.getBaseData();

			var {obserable} = this;

			obserable.on('toggleIndex',(data)=>{
				this.show = data.show;
			})

			this.initPoints();
			 
			var s = this;
			s.lastX = '';
			s.lastY = '';
			var i =0 ;
			var startX,startY;
 			window.addEventListener("deviceorientation", function(event) {
			      

			     // document.title = event.beta|0;
			     i++;
			      if(i===1){
			      	startY = event.beta;
			      }

			      var x =  event.gamma|0,
			      	  y = event.beta|0;

			      if(x<-35){
			      	x=-35;
			      }
			      if(x>10){
			      	x=10
			      }
			     
			     //document.title = x;


			      s.transX = x ;
			     

			    


			    	      

			}, true);


		}
	}
</script>