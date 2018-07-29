




$(function () {
	// 顶部 search
	$(".search").focusin(function () {
		$(".search>label").hide();
		console.log($(".search label"))
	}).focusout(function () {
		console.log($(".txt").val())
		if($(".txt").val() === ""){
			$(".search>label").show();
		}
	});
});
