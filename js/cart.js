


$(function () {
	// 收藏
	console.log(1)
	var click_num = 0;
	$(".cart_collect>a").on("click",function () {
		click_num++;
		if(click_num % 2 !== 0){
			$(this).prop("className","show");
			$(".collect_list").show();
		}
		else{
			$(this).prop("className","hide");
			click_num = 0;
			$(".collect_list").hide();
		}
	});


	/* 	购物车  */
	$.cookie.json = true;
	var arr_goods = $.cookie("arr_goods");
	console.log(arr_goods);
	if(!arr_goods || arr_goods.length === 0){
		alert("购物车为空，正在返回.........");
		location.href = "detail.html";
	}else{
		$.each(arr_goods,function (index,element) {
			$(".goods_info:first").clone().show().insertAfter(".first_tr").data("goods",element)
							.find(".goods_color").text(element.color).end()
							.find(".goods_size").text(element.size).end()
							.find(".goods_num").val(element.num).end()
							.find(".price").text(element.price).end()
							.find(".small_total").text((element.price * element.num).toFixed(2))
		});
	}

	// "全选" 功能 
	$(".check_all").click(function(){				
		$(".isCheck,.check_all").prop("checked", $(this).prop("checked"));
		getTotal();
	});
	// 点击商品行前的复选框，设置“全选”复选框状态与刷新显示合计金额
	$(".isCheck").click(function() {
		$(".check_all").prop("checked", $(".isCheck:checked").length === $(".isCheck").length ? true : false);
		getTotal();
	});

	getTotal();
	// 计算合计金额
	function getTotal() {
		var total = 0;
		$(".isCheck:checked").parents(".goods_info").find(".small_total").each(function(index, element){
			total += Number($(this).text());
		});
		// 显示合计金额
		$("#money").text(total.toFixed(2));
	}

	// 删除当前行
	$(".del_row").click(function () {
		var $row = $(this).parents(".goods_info");
		deleteRow($row);
		getTotal();
	});

	// "删除选中行"
	$("#del").click(function(){
		$(".isCheck").each(function(index, element){
			// $(this).prop("checked")
			if ($(this).is(":checked")) { // 被选中的
				var $row = $(this).parents(".goods_info");
				deleteRow($row);
			}
		});
	});

	// 删除行 函数
	function deleteRow($row) {
		// 获取到缓存在行上的商品数据
		var goods = $row.data("goods");
		// 找出当前删除的商品在数组中是第几个元素
		var index = $.inArray(goods, arr_goods);
		// 从数组中删除该索引处的元素
		arr_goods.splice(index, 1);
		// 将删除元素后的数组保存回 cookie 中
		$.cookie("arr_goods", arr_goods, {expires:7, path:"/"});
		// 从页面删除行
		$row.remove();
		// 如果购物车为空，则跳转页面
		if (arr_goods.length === 0){
			location = "detail.html";
		}
		// 重新计算合计
		getTotal();
	}


	// 加数量
	$(".up").click(function(){
		// 获取原有数量
		var amount = parseInt($(this).prev().val());
		amount++;
		// 加数量，将加了之后的结果放回文本框中显示
		$(this).prev().val(amount);
		// 获取单价
		var price = parseFloat($(this).parent().siblings(".td_price").find(".price").text());
		// 重新计算小计
		$(this).parent().prev().find(".small_total").text((price * amount).toFixed(2));
		// 重新计算合计
		getTotal();

		// 保存修改了数量的商品信息
		$(this).parents(".goods_info").data("goods").amount = amount;
		var index = $(this).parents(".goods_info").index();
		arr_goods[arr_goods.length - index].num = amount;
		$.cookie("arr_goods", arr_goods, {expires:7, path:"/"});
	});

	// 减数量
	$(".down").click(function(){
		// 获取原有数量
		var amount = parseInt($(this).next().val());
		if (amount <= 1) // 数量最小减到1
			return;
		amount--;
		// 减数量，将减了之后的结果放回文本框中显示
		$(this).next().val(amount);
		// 获取单价
		var price = parseFloat($(this).parent().siblings(".td_price").find(".price").text());
		// 重新计算小计
		$(this).parent().prev().find(".small_total").text((price * amount).toFixed(2));
		// 重新计算合计
		getTotal();

		// 保存修改了数量的商品信息
		$(this).parents(".goods_info").data("goods").amount = amount;
		var index = $(this).parents(".goods_info").index();
		arr_goods[arr_goods.length - index].num = amount;
		$.cookie("arr_goods", arr_goods, {expires:7, path:"/"});
	});
/*	$(".goods_info .goods_num").each(function(index,element){
		console.log(1)
		 var total_num = 0;
		 total_num += Number($(this).text());
		 $(".div_1 span").text(total_num);
	});*/
	
});
