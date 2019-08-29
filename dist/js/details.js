$(function(){
	let user=null;
	let id =null;
	pleaselogin =document.getElementsByClassName("pleaselogin")[0];
	top_please_top =document.getElementsByClassName("top_please_top")[0];
	lg=document.getElementsByClassName("lg")[0];
	accountNumber_p = document.getElementsByClassName("accountNumber_p")[0];
	var url=window.location.href;
	var urlIndex = url .split("?name=")[1];
	var arr = urlIndex.split("&id=");
	user =arr[0];
	id = arr[1];
	let str="";
	if(user!=null){
		str=`
			你好!${user}
		`;
		pleaselogin.innerHTML=str;
		top_please_top.innerHTML="";
		lg.innerHTML=str;
		accountNumber_p.innerHTML=str;
	}
	//侧边栏展示
	var information = JSON.parse(getCookie(user));
	var exent =  Object.getOwnPropertyNames(information).length;
	console.log(exent);
	$(".shopping_link_num").html(exent);
	$.ajax({
		url:"json/list.json",
		type:"get",
		success:function(data){
			var str ="";
			var str1 ="";
			for(let i =0;i<data.length;i++){
				if(data[i].id==id){
					//console.log(data[i]);
					str+=`
						<img src="${data[i].img}" >
						<span class="moveImg" Style="display:none"><span>
					`;
					str1+=`
						<p class="right_totil">香影</p>
						<p class="right_biaoti">${data[i].title}</p>
						<p class="right_pic">长袖套头毛衣显瘦针织衫</p>
						<div class="dtl_price">
						<div class="dtl_discount">
							<p class="dtl_dPrice">折后价&nbsp;￥<em>${data[i].dPrice}</em></p>
							<div class="dtl_vPrice">
								<p>唯品价￥${data[i].vPrice} &nbsp;<span>￥${data[i].oPrice}</span><i>${data[i].discount}折</i></p>
							</div>
						</div>
					`;
					
				}
			}
			$(".details_img").html(str);
			$(".miniImg").html(str);
			$(".big_img").html(str);
			$(".details_data").html(str1);
			$(".dtl_num").val(1);
			let value = 1;
			let count =0;
			//加减实现
			$(".plus_").click(function(){
				value++;
				$(".dtl_num").val(value);
				count=$(".dtl_num").val();
				console.log(count);
			});
			$(".minus_").click(function(){
				if($(".dtl_num").val()>1){
					value--;
				}else if($(".dtl_num").val()<=1){
					value=1;
				}
				$(".dtl_num").val(value);
				count=$(".dtl_num").val();
				console.log(count);
			});
			
			$(".cart_shopping").click(function(){
				let cart =new Cart(user);
				cart.add(id,count);
				let str= "http://localhost:8080/cart.html?name="+user+"&id="+id;
				location.href=str; 
			});
			
		}
	});
	
	//放大镜
	$(".details_img").hover(function(eve){
		$(".moveImg").attr("style","display:black");
		$(".big_img").attr("style","display:black");
		$(".details_img").mousemove(function(e){
			console.log(e.pageX,e.pageY);
			let left = e.pageX-parseInt($(this).offset().left)-$(".moveImg").width()/2;
			let top = e.pageY-parseInt($(this).offset().top)-$(".moveImg").height()/2;
			if(left<=0){
				left=0;
			}
			if(left>=$(this).width()-$(".moveImg").width()){
				left=$(this).width()-$(".moveImg").width();
			}
			if(top<=0){
				top=0;
			}
			if(top>=$(this).height()-$(".moveImg").height()){
				top=$(this).height()-$(".moveImg").height();
			}
			$(".moveImg").css({
				"left":left,
				"top":top
			});
			  let bigLeft = -$(".moveImg").position().left/$(this).width()*$(".big_img").find("img").width();
			  let bigTop =  -$(".moveImg").position().top/$(this).height()*$(".big_img").find("img").height(); 
			 $(".big_img").find("img").css({
				"left":bigLeft,
				"top":bigTop
			}); 
		});
	},function(){
		$(".moveImg").attr("style","display:none");
		$(".big_img").attr("style","display:none");
	});
	console.log($(".details_img"));
	
});