$(function(){
	//监听头部移入移出事件
	//登录
	 $(".pleaselogin").mouseenter(function(){
		$(".top_center").children().eq(2).addClass("top_please").removeClass("top_please_none");	
	}); 
	 $("#stamp").mouseleave(function(){
		$("#stamp").addClass("top_please_none").removeClass("top_please");
	}); 
	
	//签到
	 $(".sign_in").mouseenter(function(){
		$("#sign").addClass("top_sign").removeClass("top_sign_none").stop().animate({"top":"30px"},200);
	}); 
	$(".sign_in").mouseleave(function(){
		$("#sign").addClass("top_sign_none").removeClass("top_sign").stop().animate({"top":"50px"},200);
	});
	//特卖
	$(".myIndet").mouseenter(function(){
		$("#indet").addClass("top_indet").removeClass("top_indet_none");
		//console.log($(".ico-dis2"));
		$(".ico-dis2").css({"border-color":" transparent  transparent #f00581 transparent","top":"8px"});
	});
	$("#indet").mouseleave(function(){
		$("#indet").addClass("top_indet_none").removeClass("top_indet");
	});
	//vip
	$(".myVip").mouseenter(function(){
		$("#vip").addClass("top_vip").removeClass("top_vip_none");
		//console.log($(".ico-dis2"));
		$(".ico-dis2").css({"border-color":" transparent  transparent #f00581 transparent","top":"8px"});
	});
	$("#vip").mouseleave(function(){
		$("#vip").addClass("top_vip_none").removeClass("top_vip");
	});
	//客户服务
	$(".myService").mouseenter(function(){
		$("#service").addClass("top_service").removeClass("top_service_none");
		//console.log($(".ico-dis2"));
		$(".ico-dis2").css({"border-color":" transparent  transparent #f00581 transparent","top":"8px"});
	});
	$("#service").mouseleave(function(){
		$("#service").addClass("top_service_none").removeClass("top_service");
	});
	//二维码
	 $(".myCode").mouseenter(function(){
		 
		$(".top_code").attr("style","display:black");
		$(".top_code_qj").attr("style","display:black");
	}); 
	 $(".top_code").mouseleave(function(){
		$(".top_code").attr("style","display:none");
		$(".top_code_qj").attr("style","display:none");
	});
	 //更多
	 $(".myMore").mouseenter(function(){
	 	 
	 	$(".top_more").attr("style","display:black");
	 	$(".top_more_list").attr("style","display:black");
	 }); 
	  $(".top_more").mouseleave(function(){
	 	$(".top_more").attr("style","display:none");
	 	$(".top_more_list").attr("style","display:none");
	 });
	 //https://category.vip.com/ajax/getSuggest.php?callback=searchSuggestions&keyword=a
	 //https://category.vip.com/ajax/getSuggest.php?callback=searchSuggestions&keyword=a&_=1566610304200
	 
	 //搜索框
	 $(".text").click(function(){
		 $(".seek_recommend").attr("style","display:black");
		 $("body").delegate(".text","propertychange input", function () {
		    // 判断是否输入了内容
			$val = $(".text").val();
		  if($val != ""){
			$(".seek_recommend").attr("style","display:none");
		  }else{
			  $(".seek_recommend").attr("style","display:black"); 
		  }
		});
	 }); 
	 
	 $(".seek_recommend").mouseleave(function(){
		 $(".seek_recommend").attr("style","display:none");
	 });
	 //商品分类
	 $(".nav_product").hover(function(){
		$("#classify").attr("style","display:black").stop().animate({"height":"490px"},300);
	 },function(){
		 
		$("#classify").stop().attr("style","display:none").animate({"height":"0px"},300);
		$(".nav_product_precise").attr("style","display:none");
	 });
	 
	//console.log( $("#classify").find("li"));
	 $("#classify").find("li").mouseenter(function(){
		$(".nav_product_precise").attr("style","display:black");
		$(".nav_product_precise_left").html("");
		$(".nav_product_precise_right").html("");
	});
	 //侧边栏展示
	function display(obj,mubiao,size){
		$(obj).hover(function(){
			$(mubiao).attr("style","display:black").stop().animate({"left":size},300);
			
		},function(){
			$(mubiao).attr("style","display:none").stop().animate({"left":size},300);
		});
	}
	display(".body_right_one",".accountNumber","-253px");
	display(".body_right_three",".body_right_youhui","-135px");
	display(".body_right_four",".body_right_shoucang","-135px");
	display(".body_right_five",".body_right_shangjia","-135px");
	display(".body_right_six",".body_right_zuji","-135px"); 
	
	 
	let nav_product_precise_left = document.getElementsByClassName("nav_product_precise_left")[0];
	let nav_product_precise_right =document.getElementsByClassName("nav_product_precise_right")[0];
		//console.log($("#classify").children());
		$("#classify").children().each(function(){
			$(this).mouseenter(()=>{
				$(".nav_product_precise").attr("style","display:black");
				//console.log($(this).text());
				let $this=$(this);
				$.ajax({
					 url:"json/index.json",
					 type:"get",
					 success:function(data){
						//console.log(data);
						var data= data;
						let str="";
						for(var i=0;i<data.length;i++){
							if($this.text()===data[i].title){
								//console.log(data[i].src);
								/* console.log($("nav_product_precise_img").attr("src":"")); */
								var img = document.createElement("img");
								img.src=data[i].src;
								nav_product_precise_right.appendChild(img);
								for(var j=0;j<data[i].products.length;j++){
									var dl = document.createElement("dl");
									var dt =document.createElement("dt");
									var dd =document.createElement("dd");
									str =`<p>${data[i].products[j].tol}&nbsp;&nbsp;></p>`;
									dt.innerHTML=str;
									dl.appendChild(dt);
									dl.appendChild(dd); 
									nav_product_precise_left.appendChild(dl);
									//console.log(data[i].products[j]);
									for(var k=0;k<data[i].products[j].list.length;k++){
										//console.log(data[i].products[j].list[k]);
										 var a =document.createElement("a");
										a.innerHTML=data[i].products[j].list[k];
										dd.appendChild(a);
										
									}
								}
							}
						}
						
					 }
				 });
			})
		});
	
		$(window).scroll(function(event){
			//console.log($(this).scrollTop());
			let num = $(".nav").position().top+$(".nav").height();
			 if($(this).scrollTop()>=num) {
				$(".nav").css({
					"position":"fixed",
					"left":"172px",
					"top":"-43px"
					}).stop().animate({"top":0},300);
			 }
			 if($(this).scrollTop()<num){
				 $(".nav").stop().attr("style",""); 
			 }
		});
		
});