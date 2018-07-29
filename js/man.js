

$(function () {
	var isClick = false;

	// 滚轮 切换楼层导航
	$(window).scroll(function () {
		var scroTop = $(this).scrollTop();	//滚动条垂直偏移

		if(!isClick){
			$(".floor").each(function (index,element) {
				var winHeight = $(window).height();	//窗口高度

				var _top = $(this).offset().top;	//距文档顶部距离


				if(_top <= scroTop + winHeight/2){
					$("#manMenu li").eq(index).prop("className","current").siblings().prop("className","");
				}
			});
		};
	});

	// 点击 切换楼层
	$("#manMenu li").on("click",function () {
		isClick = true;
		$(this).prop("className","current").siblings().prop("className","");
		var index = $(this).index();
		var curr_top = $(".floor").eq(index).offset().top;
		console.log($(".floor").eq(index),curr_top);
		$("html").stop(true).animate({"scrollTop" : curr_top},800,function () {
			isClick = false;
		});
	});

});