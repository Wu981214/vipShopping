$(function(){
	let user=null;
	let id =null;
	pleaselogin =document.getElementsByClassName("pleaselogin")[0];
	top_please_top =document.getElementsByClassName("top_please_top")[0];
	lg=document.getElementsByClassName("lg")[0];
	accountNumber_p = document.getElementsByClassName("accountNumber_p")[0];
	var url=window.location.href;
	var urlIndex = url .split("?name=")[1];
	user =urlIndex;
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
	//侧边购物数量展示
	var information = JSON.parse(getCookie(user));
	var exent =  Object.getOwnPropertyNames(information).length;
	console.log(exent);
	$(".shopping_link_num").html(exent); 
	$.ajax({
		url:"json/list.json",
		type:"get",
		success:function(data){
			//setLoc("product",data);
			var data = data;
			localStorage.setItem("products",JSON.stringify(data));
			let str="";
			for(let i=0;i<data.length;i++){
				//localStorage.setItem("products",JSON.stringify(data[i]));
				str+=`
					<dl name_id=${data[i].id} style="">
						<dt>
							<img src=${data[i].src}>
							<span>折后价￥<i>${data[i].dPrice}</i></span>
						</dt>
						<dd>
							<span>唯品价￥${data[i].vPrice} <i>￥${data[i].oPrice}</i> <em>${data[i].discount}折</em></span>
							<p>${data[i].title}</p>
						</dd>
					</dl>
				`;
			}
			$(".product_list").html(str);
			$(".product_list").find("dl").each(function(){
				if($(this).attr("name_id")%4==0){
					$(this).attr("style","margin-right:0");
				}
				$(this).click(function(){
					/* for(let i=0;i<data.length;i++){
						if($(this).attr("name_id")==data[i].id){
							setLoc(user,data[i]);
						}
					} */
					let id = $(this).attr("name_id");
					let url= "http://localhost:8080/details.html?name="+user+"&id="+id;
					location.href=url;
				});
			});
		}
	
	});
});