




$(function () {
	// 顶部 search
	$(".search").focusin(function () {
		$(".search>label").hide();
		console.log($(".search label"))
	}).focusout(function () {
		$(".search>label").show();
	});
});
