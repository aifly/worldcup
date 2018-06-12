var imgs = {
	play: './assets/images/play.png',
	logo: './assets/images/logo.png',
	arrow: './assets/images/arrow.png',
	logo2: './assets/images/logo2.png',
	indexBg: './assets/images/index-bg.jpg',
	indexTitle: './assets/images/index-title.png',
	point:'./assets/images/point.png',
	team1:'./assets/images/team1.png',
	team1Ico:'./assets/images/team-ico1.png',
	team2Ico:'./assets/images/team-ico2.png',
	team2:'./assets/images/team2.png',
	team3:'./assets/images/team3.png',
	team4:'./assets/images/team4.png',
	logo1:'./assets/images/logo1.png',
	pk:'./assets/images/pk.png',
	talkTitle:'./assets/images/talk-title.jpg',
	talkBg:'./assets/images/talk-bg.jpg',
	vs:'./assets/images/vs.png',
	xiaoxin:'./assets/images/xiaoxin.png',
	countdownBg:'./assets/images/countdown-bg.png',
	xiaoxinTextBg:'./assets/images/xiaoxin-text-bg.png',
	

	
}

var texts = {
	zlmIntro: '5月28日，中宣部授予张黎明同志“时代楷模”称号。',
	zlmName: '张黎明',
	zlmIntroContent:[
		'国家电网天津滨海供电公司运维检修部配电抢修一班班长、滨海黎明共产党员服务队队长，曾荣获全国优秀共产党员、全国劳动模范、全国五一劳动奖章、全国职工职业道德建设标兵、全国岗位学雷锋标兵等多项荣誉，党的十九大代表。',
		'他爱岗敬业，工作30多年来始终奋战在电力抢修一线，累计巡线8万多公里，完成故障抢修作业近2万次，被誉为电力抢修的“活地图”。',
		'他勇于创新，先后实现技术革新400余项，20多项填补电力行业空白，是知识型、技能型、创新型劳动者的杰出代表。',
		'他甘于奉献，模范践行全心全意为人民服务的根本宗旨，带领黎明共产党员服务队，十年如一日开展学雷锋志愿服务，用爱心搭起了企业与群众的“连心桥”。'
	],
	
}

var aigangjingye = {//爱岗敬业
	title:imgs.detailTitle,
	subTitle: '张黎明巡查线路图',
	videoPoster:imgs.videoPoster,
	videoText: '在同事眼中，张黎明不仅是个勤于学技术、精于干专业的技术工，更是一个办事认真敬业、值得信任的“实诚人”。 ',
	image:imgs.zlm,
	videoUrl:'./assets/video/aigangjingye1.mp4',
	imageText: '一年冬天，有位同事因家中有急事请假，张黎明主动替他去巡查沿线77根电线杆。在寒风中，夜间巡线异常辛苦。张黎明蹬着自行车一不小心掉进水渠中，冰水将他的棉裤浸透。线路尚未巡完，怎么办？上岸后，张黎明没有打退堂鼓，忍着逐渐结冰的棉裤散发出的刺骨寒气，跨上自行车，硬是将整条线路逐段不落巡查完才回家换衣服。|有人问他为什么这么犟， 可他憨憨地回上一句：“ 要是不巡完， 我就不放心。”'
}
var yongyuchuangxin = { //勇于创新
	title: imgs.detailTitle1,
	subTitle: '张黎明工作室图',
	videoPoster: imgs.videoPoster,
	videoText: '“工作是快乐的。创新让工作更快乐。”张黎明常把这句话挂在嘴边勉励同事、徒弟们。 ',
	image: imgs.zlm1,
	videoUrl: './assets/video/yongyuchuangxin.mp4',
	imageText: '2011年，以张黎明名字命名的“张黎明创新工作室”应运而生，这是国网天津市电力公司的第一个职工创新工作室。工作室成立以来，张黎明带领同事们开展技术革新400余项，获得国家专利140余个，20多项成果填补智能电网建设空白。'
}

var ganyufengxian = { //甘于奉献
	title: imgs.detailTitle2,
	subTitle: '张黎明帮助居民修电',
	videoPoster: imgs.videoPoster,
	videoText: '电与老百姓的生活休戚相关，张黎明始终惦记着老百姓的用电需要。除了抢修班班长，他还有一个特殊的“头衔”——滨海黎明共产党员服务队队长。  ',
	image: imgs.zlm2,
	videoUrl: './assets/video/ganyufengxian.mp4',
	imageText: '2017年4月12日，滨海新区新开里社区按事先通知安排实施计划停电检修。断电前，服务队突然接到社区居民打来的电话：她96岁的老母亲瘫痪在床，靠呼吸机维持生命，断电随时有生命危险。|张黎明叫上队员带上发电机火速出发。在现场，他们架设起20米长的入户供电线路，实施了持续11个小时的特殊供电服务。'
}

var comments = [
	{
		headimgurl:imgs.head,
		name: '滨海新区区委宣传部张宁',
		content: '张黎明在看似平凡中彰显了一名共产党员的先进本色。',
	},
	{
		headimgurl: imgs.head,
		name: '国网天津电力公司党建工作部主任及明',
		content: '张黎明所展现出的良好的党性修养产生了辐射效应，带动了一批党员群众向他看齐。'
	}


]



var arr = [];


for (var attr in imgs) {
	arr.push(imgs[attr]);
}
 
var musics = {
	music: {
		src: './assets/music/bg2.mp3',
		autoplay: false,
		name: 'bg',
		loop: true
	},
	photo:{
		src:'./assets/music/photo.mp3',
		autoplay:false,
		name:"photo",
		loop:false
	}
};

 (function () {

 	if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
 		handleFontSize();
 	} else {
 		if (document.addEventListener) {
 			document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
 		} else if (document.attachEvent) {
 			document.attachEvent("WeixinJSBridgeReady", handleFontSize);
 			document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
 		}
 	}

 	function handleFontSize() {
 		// 设置网页字体为默认大小
 		WeixinJSBridge.invoke('setFontSizeCallback', {
 			'fontSize': 0
 		});
 		// 重写设置网页字体大小的事件
 		WeixinJSBridge.on('menu:setfont', function () {
 			WeixinJSBridge.invoke('setFontSizeCallback', {
 				'fontSize': 0
 			});
 		});
 	}
 })();