$(function(){
	//侧边栏

	//侧边购物数量展示
	var url=window.location.href;
	var urlIndex = url .split("?username=")[1];
	user =urlIndex;
	var information = JSON.parse(getCookie(user));
	var exent =  Object.getOwnPropertyNames(information).length;
	$(".shopping_link_num").html(exent); 
	let num=0;
	//轮播图
	let timer = setInterval(function(){
		num++;
		 if(num%2!=0){
			 	$(".carousel_center").find("img").eq(0).stop().fadeOut(1000).siblings().stop().fadeIn(1000);
				$(".carousel_center").find("li").eq(0).css({"border-bottom":"3px solid #f00581"}).siblings().attr("style","border:none");
		 }else{
				$(".carousel_center").find("img").eq(1).stop().fadeOut(1000).siblings().stop().fadeIn(1000);
				$(".carousel_center").find("li").eq(1).css({"border-bottom":"3px solid #f00581"}).siblings().attr("style","border:none");
		 }
		
	},4000);
	
	//楼梯
	$(window).scroll(function(event){
		//console.log(parseInt($(this).scrollTop()));
		//console.log($(".stairs").offset().top);
		if(parseInt($(this).scrollTop())>=1200){
			$(".stairs").css({
				"position":"fixed",
				"top":"175px",
				"left":"50px"
			});
		}else if(parseInt($(this).scrollTop())<1200){
			$(".stairs").css({
				"position":"absolute",
				"top":"0",
				"left":"50px",
			});
		}
		$scrollTop = $(this).scrollTop();
		//console.log($(".index_count").find(".stairs").siblings());
		$(".index_count").find(".stairs").siblings().each(function(){
			if($scrollTop>= $(this).offset().top - $(this).outerHeight()/2){
				var index = $(this).index()-1;
				$(".stairs").find(".stairs_list").eq(index).addClass("hover").siblings().removeClass("hover");
			}
		});
	});
	$(".stairs").find(".stairs_list").each(function(){
		$(this).click(function(){
			var index = $(this).index()+1;
			$("html,body").animate({"scrollTop":$(".index_count").children().eq(index).offset().top-50},200,function(){
			})
		})
	});
	
	//购物车数量展示
	
});