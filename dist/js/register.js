$(function(){
	
	
	$(".btn").click(function(){
			//匹配邮箱 1401693013@qq.com
			let res1=/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
			//匹配账号 4到16位，字母数字下划线，减号
			let res2 =/^[-_a-zA-Z0-9]{4,16}$/;
			$username = $(".username").val();
			$email = $(".email").val();
			$psw=$(".psw").val();
			$sex = $(".sex").val();
			let falg = true;
			 if(res1.test($email)==false){
				falg = false;
				$(".email_span").attr("style","display:black");
			}else{
				$(".email_span").attr("style","display:none");
			}
			if(res2.test($username)==false){
				falg = false;
				$(".username_span").attr("style","display:black");
			}else{
				$(".username_span").attr("style","display:none");
			} 
			//console.log(res2.test($username));
			if(falg=true){
				//http://47.104.244.134:8080/
				$.get("http://47.104.244.134:8080/username.do","$username",function(data){
					console.log(data);
					if(data.code === 1){
						console.log("账号可以使用!");
						$.get("http://47.104.244.134:8080/useremail.do","$email",function(data){
							console.log(data);
							if(data.code === 1){
								console.log("邮箱可以使用!");
								$.post("http://47.104.244.134:8080/usersave.do",{
									username:$username,
									password:$psw,
									email:$email,
									sex:$sex
								},function(data){
									console.log(data);
								});
							}else{
								$(".email_span").text("邮箱名已被使用!请换一个试试。");;
								$(".username_span").attr("style","display:black");
							}
						});
					}else{
						$(".username_span").text("账号明已被使用!请换一个试试。")
						$(".username_span").attr("style","display:black");
					}
				});
			}
	});
});