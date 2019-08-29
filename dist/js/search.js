onInput = document.querySelectorAll("input")[0];
seek_search_ul =document.getElementsByClassName("seek_search_ul")[0];

			onInput.oninput=function(){
				let val =this.value;
				var oScript = document.createElement("script");
				oScript.src="https://category.vip.com/ajax/getSuggest.php?callback=searchSuggestions&keyword="+val;
				document.body.appendChild(oScript);
			}
			function searchSuggestions(data){
				//console.log(data.data);
				let str="";
				 for(let i=0;i<data.data.length;i++){
					// console.log(data.data[i]);
					 str+=`<li><a href="">${data.data[i].word}</a></li>`;
				 } 
				seek_search_ul.innerHTML=str;
			}