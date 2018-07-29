console.log("detail.js");
$(function() {
	/* 放大镜 功能 */
	$(".small_box a").on("mouseover",function () {
		$(this).siblings().prop("className","").end()
				.prop("className","curr");
	});
	$(".small_box img").on("mouseover",function () {
		var src = $(this).prop("src");
		$(".medium_box .top_pic").prop("src",src.replace("small","medium")).stop().fadeIn("800",function (){
			$(".medium_box .bottom_pic").prop("src",src.replace("small","medium"));
			$(this).fadeOut("800");
		});
		$(".big_box img").prop("src",src.replace("small","big"));
	});

/*	var init_left = ev.clientX - $(".shade_box").pageX,
		init_top = ev.clientY - $(".shade_box").pageY;*/
	var shadeWidth = $(".shade_box").outerWidth(),
		shadeHeight = $(".shade_box").outerHeight(),
		mediumWidth = $(".medium_box").width(),
		mediumHeigth = $(".medium_box").height(),
		ratio_x = $(".big_box").width() / $(".shade_box").width() + 0.3,
		ratio_y = $(".big_box").height() / $(".shade_box").height() - 0.7;
		// console.log(ratio_x,ratio_y);
	$(".medium_box").hover(function (ev) {
		$(".shade_box,.big_box").show();
	},function () {
		$(".shade_box,.big_box").hide();
	}).on("mousemove",function (ev) {
		$(".shade_box").offset({
			"top" : ev.pageY - shadeHeight/2,
			"left": ev.pageX - shadeWidth/2
		});
		var position = $(".shade_box").position(),
			final_left = position.left,
			final_top = position.top;

		if(final_top < 0)
			final_top = 0;
		else if(final_top > mediumHeigth - shadeHeight)
			final_top = mediumHeigth - shadeHeight;
		if(final_left < 0)
			final_left = 0;
		else if(final_left > mediumWidth - shadeWidth)
			final_left = mediumWidth - shadeWidth;

		$(".shade_box").css({
			top : final_top,
			left: final_left
		});

		$(".big_box img").css({
			top : -final_top*ratio_y,
			left: -final_left*ratio_x
		});
	});

	/* end */


	/* 选择颜色 */
	$(".choice_color li a,.choice_size li a").on("click",function () {
		$(this).parent().siblings().children().prop("className","");
		$(this).prop("className","have_bg");
	});
	$(".choice_size");

	/* 选择尺寸 */
/*	$(".choice_size li a").on("click",function () {
		$(this).parent().siblings().children().prop("className","");
		$(this).prop("className","have_bg");
	});
	$(".choice_size");*/

	/* 选择数目 */
	$(".up,.down").on("click",function () {
		var buyNum =$(this).siblings("input").get(0);
		var max = 100;
		if(this.className === "up" && buyNum.value < max)
			buyNum.value++;
		if(this.className === "down" && buyNum.value > 1)
			buyNum.value--;

		if(buyNum.value <= 1){
			$(".down").css("background-position","-224px -160px ");	/* 不能减 */
		} else{
			$(".down").css("background-position","-207px -160px");
		}
		if(buyNum.value >= 100){
			$(".up").css("background-position","-224px -179px ");	/* 不能加 */
		} else{
			$(".up").css("background-position","-207px -179px");
		}
	});
	

	/* 选项卡切换 开始 */
	var offTop = $(".intro_title").offset().top;	// 文档加载时 intro_title初始位置
	$(".intro_title ul a").on("click",function () {
		$(this).parent().siblings().children("a").prop("className","");
		$(this).prop("className","curr");

		var index = $(this).parent().index();
		$(".intro_left").children().hide().eq(index).show();;

		$("html,body").animate({scrollTop:offTop},666);
	});
	// 选项卡 悬浮
	$(window).scroll(function () {
		if($(this).scrollTop() >= offTop){
			$(".intro_title").css({
				"position":"fixed",
				"top":0
			});
		}else{
			$(".intro_title").css("position","static");
		};

		if($(this).scrollTop() >=  $(".pay_method").offset().top)
			$(".fixed_left").show();
		else
			$(".fixed_left").hide();
	});


	/* 走秀承诺 选项卡切换 */
	$(".promise_tab a").on("mouseover",function () {
		var index = $(this).parent().index();
		$(this).parent().siblings().children().prop("className","");

		$(".promise_list").children("div").hide().eq(index).show();
	});

	/* 右侧固定 */
	// 关闭
	$(".fixed_right>span:first").on("click",function () {
		$(this).parent().hide();
	});
	// 回到顶部
	$(".fixed_right>.a4").on("click",function () {
		$("html,body").animate({scrollTop:0},666);
	});





	/**/
	/* 	添加至 购物车  */
	
	$(".in_bag").on("click",function () {
		$.cookie.json = true;
		var sPrice = $(".show_price").text;
	/*	if(sPrice.match("万") === "万"){
			sPrice.replace("万","");
			sPrice += parseInt(sPrice) * 10000;
		}*/
		var goods = {
			"id"  	 : $("#goods_id").text(),
			"color"  : $(".choice_color .have_bg").text(),
			"size"	 : $(".choice_size .have_bg span").text(),
			"price"	 : Number($(".show_price").text().replace("万","")),
			"num"	 : Number($("#num").val())
 		}
 		// console.log(goods)
 		var arr_goods = $.cookie("arr_goods");		
 		if(!arr_goods){
 			arr_goods = [];
 		}
 		var index = findIndex(goods,arr_goods);
 		if(index === -1){
 			arr_goods.push(goods);
 		}else{
 			arr_goods[index].num++;
 		}

/* 		else{
 			for(var index=0;index<arr_goods.length;index++){
 				var curr = arr_goods[index]
 				if(goods.id === curr.id && goods.color === curr.color && goods.size === curr.size){
 					curr.num += goods.num;
 				}else{
 					arr_goods.push(goods);
 				}	
 			}
	 	}*/
	 	function findIndex(obj,arr_goods) {
	 		for(var i in arr_goods){
	 			var curr = arr_goods[i]; 			
	 			for(var j in obj){
	 				if(curr.id === obj.id && curr.color === obj.color && curr.size === obj.size){
	 					return i;
	 				}
	 			}
	 		}
	 		return -1;
	 	}
		console.log(arr_goods)
 		$.cookie("arr_goods",arr_goods,{expires:7,path:"/"});
 			
 		
	});

});

