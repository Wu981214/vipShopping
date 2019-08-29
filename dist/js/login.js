$(function(){
	
	$(".btn").click(function(){
		$username = $(".username").val();
		$password = $(".password").val();
		$.post("http://47.104.244.134:8080/userlogin.do",{
			name:$username,
			password:$password
		},function(data){
			// console.log(data.data.token);
			 if(data.code === 0){
				
				var id = data.data.token;
				alert("欢迎来到唯品会!")
				let str= "http://localhost:8080/index.html?username="+$username;
				//let url
				location.href=str;
			} 
		});
	});
});