function Cart(name){
	this.user =name;
	//console.log(getCookie(this.user));
	if(getCookie(this.user)!==undefined){
		this.cartData =JSON.parse(getCookie(this.user));
	}else{
		console.log("a");
		this.cartData={};
	}
	//console.log(this.cartData);
}


Cart.prototype.add=function(id,val){
	//console.log(val);
	if(this.cartData[id]===undefined){
		this.cartData[id]=Number(val);
	}else{
		this.cartData[id]+=Number(val);
	}
	setCookie(this.user,JSON.stringify(this.cartData),7);
}

Cart.prototype.show=function(obj){

	this.cartList = document.getElementsByClassName(obj)[0];
	//console.log(getCookie("yyfjklgiu"));
	//this.cartNum = getCookie("yyfjklgiu");
	let data = JSON.parse(localStorage.getItem("products"));
	let str = "";
	//console.log(this.cartNum);
	for(let id  in this.cartData){
		//console.log(this.cartNum.j);
		for(let i=0; i<data.length;i++){
			if(data[i].id==id){
				//console.log(data[i]);
				str+=`
					<dl>
						<dt>
							<div class="cart_img">
								<img src="${data[i].img}" >
							</div>
							<div class="cart_title">
								<p><span>自营</span> | ${data[i].title}</p>
							</div>
						</dt>
						<dd>
							<div class="cart_univalence">
								<ul>
									<li>￥<b>${data[i].dPrice}</b></li>
									<li>￥${data[i].oPrice}</li>
								</ul>
							</div>
							<div class="cart_num">
								<span class="plus" cartID="${id}">+</span>
								<input type="text" name="" id="" value="${this.cartData[id]}" class="dtl_num"/>
								<span class="minus" cartID="${id}">-</span>
							</div>
							<div class="cart_totalPlace">
								<span>￥<b class="total_Price">${data[i].dPrice*this.cartData[id]}</b></span>
							</div>
							<div class="cart_del">
								<a href="javascriptvoid:;" cartID="${id}">删除</a>
							</div>
						</dd>
					</dl>
				`;
			}
		}
	}
	this.cartList.innerHTML=str;
	let _this= this;
	$(".cart_del").find("a").each(function(){
		this.onclick=function(){
			let id = this.getAttribute("cartID");
			console.log(this);
			let obj =this.parentNode.parentNode.parentNode;
			console.log(obj);
			console.log(this.user);
			_this.del(id,obj);
		}
	});
	_this.input();
	_this.totalPrice();
}

Cart.prototype.del=function(id,obj){
	console.log(this.id);
	console.log(this.user);
	this.cartList.removeChild(obj);
	delete this.cartData[id];
	setCookie(this.user,JSON.stringify(this.cartData),7);
	window.onload();
}


Cart.prototype.input=function(){
	let plus_ = document.getElementsByClassName("plus");
	let dtl_num = document.getElementsByClassName("dtl_num");
	let minus_ =document.getElementsByClassName("minus");
	//console.log(plus_);
	username=this.user;
	_this=this;
	let leng = plus_.length;
	for(let i=0;i<leng;i++){
		plus_[i].onclick=function(){
		let id = this.getAttribute("cartID");
		let count = dtl_num[i].value;
		dtl_num[i].value++;
		let val = dtl_num[i].value-count;
		_this.add(id,val);
		window.onload();
		}
		minus_[i].onclick=function(){
		let id = this.getAttribute("cartID");
		let count = dtl_num[i].value;
		if(dtl_num[i].value<=1){
			dtl_num[i].value=1;
		}else if(dtl_num[i].value>1){
			dtl_num[i].value--;
		}
		let val = dtl_num[i].value-count;
		_this.add(id,val);
		window.onload(); 
		}
	}
}
Cart.prototype.totalPrice=function(){
	let  totalPrice = document.getElementsByClassName("total_Price");
	let zj = document.getElementsByClassName("zj");
	//console.log(totalPrice);
	let str =0;
	for(let i=0;i<totalPrice.length;i++){
		str+=Number(totalPrice[i].innerText);
	}
	//console.log(str);
	 for(let i=0;i<zj.length;i++){
		zj[i].innerHTML=str;
	} 
	
}