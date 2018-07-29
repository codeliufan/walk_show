


$(function(){
	$.get(
		"../js/address.json",
		function(data){
			console.log(data)
			var html = "";
			$.each(data.regions, function(index,element) {
				html += "<option class='shengname' value='"+index+"'>"+ element.name+"</option>";
					
			});
			$(html).appendTo(".sheng");
		}
	);
	
	
	$(".sheng").on("change",function(){
		
		var curr = $(".sheng option:selected").index() - 1;
		$(".shi").html("<option>请选择</option>");
		$(".xian").html("<option>请选择</option>");
		$.get(
		"../js/address.json",
			function(data){
				var html = "";
				$.each(data.regions[curr].regions, function(index,element) {
					html += "<option class='shiname' value='"+index+"'>"+ element.name+"</option>";
						
				});
				$(html).appendTo(".shi");
			}
		);
	});
	
	
	$(".shi").on("change",function(){
		
		var currSheng = $(".sheng option:selected").index() - 1;
		var currShi = $(".shi option:selected").index() - 1;
		$(".xian").html("<option>请选择</option>");
		$.get(
		"../js/address.json",
			function(data){
				var html = "";
				$.each(data.regions[currSheng].regions[currShi].regions, function(index,element) {
					html += "<option class='xianname' value='"+index+"'>"+ element.name+"</option>";
						
				});
				$(html).appendTo(".xian");
			}
		);
	});
});
