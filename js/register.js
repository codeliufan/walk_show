
$(function () {
	var userName = "";
	var userPwd = "";
 	
 	var isName = false;
 	var isPwd = false;
 	// 样式

 	$(this).find(".phone_num,.check_code,.check_pwd").find("input").focusin(function () {
 		// console.log("in")
 		var $currInput = $(this);
 		$currInput.css("borderColor","#7fbfe7").siblings("label").css("bottom","26px");
 		
 		// 操作了 电话号码
 		if($currInput[0] === $(".phone_num>input")[0]){
 			$($currInput).siblings("p").remove();
 		}
		// 操作了 密码
 		if($currInput[0] === $(".check_pwd>input")[0]){
 			$($currInput).siblings("p").remove();
 		}

 	}).focusout(function () {
 		var $currInput = $(this);
	 	// 更改了 电话号码
	 	if($currInput[0] === $(".phone_num>input")[0]){
	 		userName = $currInput.val();
	 		
	 		var regPhone = /^1[0-9]{10}$/;
	 		console.log(regPhone,regPhone.test(userName))
	 		if(!regPhone.test(userName)){
	 			$currInput.val("");
	 			var err = "<p style='color:red;margin:0 0 10px 5px;'>输入的电话号码有误，请重新输入！</p>";
	 			$currInput.before(err);
	 		}else{
	 			isName = true;
	 		}
	 	}
	 	// 更改了 密码
	 	if($currInput[0] === $(".check_pwd>input")[0]){
	 		userPwd = $currInput.val();
	 		
	 		var regPwd = /^[0-9]{6}$/;
	 		// console.log(regPwd,regPwd.test(userPwd))
	 		if(!regPwd.test(userPwd)){
	 			$currInput.val("");
	 			var err = "<p style='color:red;margin:0 0 10px 5px;'>密码只能由6位数字组成！</p>";
	 			$currInput.before(err);
	 		}
	 		else{
	 			isPwd = true;
	 		}
	 	}

 		$currInput.css("borderColor","#d8d8d8");
 		if($currInput.val() === "")
	 		$currInput.siblings("label").css("bottom","9px");

 	});

 	// button
 	$("#gain_code").on("click",function () {
 		return false;
 	});

 	// 写入 cookie
	$("#register").on("click",function () {
		console.log(userName,userPwd)
		if(userName !== "" && userPwd !== "" && isName && isPwd){
			$.cookie("userName", userName, {expires:7, path:"/"});
			$.cookie("userPwd", userPwd, {expires:7, path:"/"});
			alert("注册成功！");
			location.href = "login.html";
		}
		else{
			$("#user_name").val("");
			$("#user_name").parents(".login_phone").find("p").remove();
			var err = "<p style='color:red;margin:0 0 10px 5px;'>请输入用户名或密码！</p>";
			$("#user_name").before(err);
		}
	});
});