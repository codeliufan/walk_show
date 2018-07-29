
$(function () {
 	// 获得 cookie
	var userName = $.cookie("userName");
	var userPwd = $.cookie("userPwd");
	// console.log(userName,userPwd)

	var currName="";
	var currPwd="";
 	// 样式

 	$("#user_name")[0].value = "";
 	$("#user_pwd")[0].value = "";

 	$(this).find(".phone_num,.check_code,.check_pwd").find("input").focusin(function () {
 		// console.log("in")
 		var $currInput = $(this);
 		$currInput.css("borderColor","#7fbfe7").siblings("label").css("bottom","26px");
 		
 		// 操作了 电话号码
 		if($currInput[0] === $(".phone_num>input")[0]){
 			$currInput.siblings("p").remove();
 		}
		// 操作了 密码
 		if($currInput[0] === $(".check_pwd>input")[0]){
 			$currInput.siblings("p").remove();
 		}

 	}).focusout(function () {
 		var $currInput = $(this);

	 	// 更改了 电话号码
	 	if($currInput[0] === $(".phone_num>input")[0]){
	 		currName = $currInput.val();

	 		var regPhone = /^1[0-9]{10}$/;
	  		if(!regPhone.test(currName)){
	 	 			$currInput.val("");
	 	 			var err = "<p style='color:red;margin:0 0 10px 5px;'>用户名格式错误！</p>";
	 	 			$currInput.before(err);
	 	 	} 		
	 	}
	 	// 更改了 密码
	 	if($currInput[0] === $(".check_pwd>input")[0]){
	 		currPwd = $currInput.val();
	 		
	 		// console.log(regPwd,regPwd.test(currPwd))
	 		
	 	}

 		$currInput.css("borderColor","#d8d8d8");
 		if($currInput.val() === "")
	 		$currInput.siblings("label").css("bottom","9px");

 	});

 	$("#login").on("click",function () {
 		console.log(currName,currPwd)
 		if(currName === userName && currPwd === userPwd){
 			location.href = "../index.html";
 		}
 		else{
 			$("#user_name").parents(".login_phone").find("p").remove();
 			var err = "<p style='color:red;margin:0 0 10px 5px;'>用户名或密码输入错误！</p>";
 			$("#user_name").before(err);
	 	}	
 	});
 	// button
});