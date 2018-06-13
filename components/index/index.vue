<template>
	<div   class="lt-full zmiti-index-main-ui "  :style="{background:'url('+imgs.indexBg+') no-repeat center bottom',backgroundSize:'cover'}"  :class="{'show':show,'active':createImg}" ref='page'>
		<transition 
			name='zmiti-scale'
			@after-enter='afterEnter'
			>
				<div ref='createimgs' class="zmiti-createimg"  v-if='createImg'>
					<img :src="createImg" alt="">
					<div v-show='showShareBtn' class="zmiti-share-btn" v-tap='[showMask]'>分享</div>
				</div>
			</transition>
		<transition name='index'>
			<div class="zmiti-index lt-full" v-if='!showIndexMask'>
				
				<div class="zmiti-index-logo">
					<img :src="imgs.logo2" alt="">
				</div>
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
									<div :style='{marginTop:!showBtns?"36px":"10px"}'>{{rate}}</div>
									<div>比分{{team1.score}}:{{team2.score}}</div>
								</section>
							</div>
						</div>
				</div>
				<div class="zmiti-index-bottom">
					<div class="zmiti-index-btns" v-show='showBtns'>
						<div v-tap='[html2img]'>认 同</div>
						<div v-tap='[entry]'>PK小新</div>
					</div>
				</div>
				<canvas :width="viewW" height="900" ref='canvas'>

				</canvas>
			</div>
		</transition>
		
		

		<div class="zmiti-mask lt-full" v-if='showMasks' @touchstart='hideMask'>
			<img :src="imgs.arrow">
		</div>
	</div>
</template>

<script>
	import './index.css';
	import {imgs} from '../lib/assets.js';
	import zmitiUtil from '../lib/util';
	import '../lib/html2canvas';
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
				rate:'',
				show:true, 
				showShareBtn:false,
				showBtns:true,
				showIndexMask:false,
				showMasks:false,
				score:'',
				transX:-200,
				showVideo:false,
				viewW:window.innerWidth,
				fullscreen:true,
				vidoeUrl:'./assets/video/index1.mp4',
				createImg:'',
				running:true
			}
		},
		components:{
		},
		
		methods:{
			hideMask(){
				this.showMasks = false;
			},
			imgStart(e){
				e.preventDefault(); 
			},
			showMask(){
				this.showMasks = true;
			},
			afterEnter(){
				this.showShareBtn = true;
			},
			entry(){
				
				var {obserable} = this;
				this.show = false;
				var s = this;
				obserable.trigger({
					type:'entryTalk',
					data:{
						team1:s.team1,
						team2:s.team2,
						points:s.score
					}
				});
				setTimeout(() => {
					this.running = false;
				}, 100);
			},

			html2img(){
				var s = this;
				this.showBtns = false;
				this.rate = '我与小新的预测相同'

				//zmitiUtil.wxConfig('我是第'+(s.pv)+'位种树者',window.desc)
				var {obserable} = this;
				setTimeout(()=>{
					var ref = 'page';
					var dom = this.$refs[ref];
					html2canvas(dom,{
						useCORS: true,
						onrendered: function(canvas) {
					        var url =  canvas.toDataURL('image/jpg');
							console.log(url);

							 s.createImg = url;
							 
							 return
							
					        $.ajax({
					          //url: window.protocol+'//api.zmiti.com/v2/share/base64_image/',
					          url:window.protocol+'//'+window.server+'.zmiti.com/v2/share/base64_image/',
					          type: 'post',
					          data: {
					            setcontents: url,
					            setwidth: dom.clientWidth,
					            setheight:dom.clientHeight
					          },
					          error(){
					          },
					          success: function(data) {
					          	//alert('data.getret =>'+data.getret)
					            if (data.getret === 0) {
					            	//s.deleteImg(dt.img);


					            	s.canShare = true;//可以分享了
					               var src = data.getimageurl;
					             
	
									var url = window.location.href.split('#')[0];

									url = zmitiUtil.changeURLPar(url,'src',src);
									url = zmitiUtil.changeURLPar(url,'num',s.pv);
									zmitiUtil.wxConfig('我是第'+(s.pv)+'位种树者',window.desc,url)
								       
					            }else{
					            }

					          }
					        })

					      },
					      width: dom.clientWidth,
					      height:dom.clientHeight
					})
				},1000)
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
				
					this.running && animationFrame(render);
				}
				
				render()


			},
			getBaseData(){
				var s = this;
				$.ajax({
					url:"http://119.84.122.135:27701/predict/1",
					success(data){
						if(typeof data === 'string'){
							try {
								data = JSON.parse(data);
								if(data.code === 0){
									console.log(data);
									/* s.rate = data.rate;
									//s.rate = '我和小新的预测相同';
									s.score = data.points;
									s.team1 = {
										teamname:data.host,
										score:data.points.split('-')[0]
									}
									s.team2 = {
										teamname:data.guest,
										score:data.points.split('-')[1]
									} */
									s.team1 = data.basedata.teams[1];
									s.team2 = data.basedata.teams[0];
									if(s.team1.score>s.team2.score){
										s.rate = '小新通过大数据分析预判'+s.team1.teamname+'队将获胜!';
									}else{
										s.rate = '小新通过大数据分析预判'+s.team2.teamname+'队将获胜!';
									}
									//if(data.b)
								}
							} catch (error) {
								
							}
						}
						
					}
				});
				return;
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

		//	this.createImg = './assets/images/create.png';
			var {obserable} = this;

			obserable.on('toggleIndex',(data)=>{
				this.show = data.show;
			})

			this.initPoints();
			 
			 


		}
	}
</script>