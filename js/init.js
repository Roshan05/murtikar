(function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.modal').modal();
    $('.slider').slider();
    $('.materialboxed').materialbox();
    layCards();

  }); // end of document ready
})(jQuery); // end of jQuery name space

var isVerifyed = false;
var clickedImg = -1;
var images_list = [
{
	src: "images/11.jpg",
	title: "Ganesha on Sinhasan",
	price: "51000"
},
{
	src: "images/22.jpg",
	title: "Ganesha Carved in Antique Wood",
	price: "12000"
},
{
	src: "images/33.jpg",
	title: "Sleeping Ganesh",
	price: "2100"
},
{
	src: "images/44.webp",
	title: "Eco Friendly Ganesh Murti",
	price: "7000"
}
];


function getCardElem(imageElem, counter){
	var str = `<div class="col s12 m6"><div class="card">
	           <div class="card-image">
	             	<img src="` + imageElem.src + `">
	             	<span class="card-title"><h4>` + imageElem.title + `</h4></span></div>
	             <div class="card-content">
	             	<p>Om Gan Ganapatay Namo Namah! Shri Siddhivinayak Namo Namah! Asta Vinayak Namo Namah! Ganapati Bappa Moraiya!</p>
	             </div>
	             <div class="card-action"><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick="markThisClicked(`+ counter +`)">Get Price</a></div></div></div>`;
	return str;
}

function getModalElem(){
	var str = `
		    <form class="col s12 l6" id="output_block">
		        <div class="input-field col s12">
		          <i class="material-icons prefix">account_circle</i>
		          <input id="icon_prefix" type="text" class="validate">
		          <label for="icon_prefix">First Name</label>
		        </div>
		        <div class="input-field col s12">
		          <i class="material-icons prefix">phone</i>
		          <input id="icon_telephone" type="number" class="validate">
		          <label for="icon_telephone">Telephone</label>
		        </div>
		        <div class="col s12">
					<a class="waves-effect waves-light btn" onclick="handleOnGetPrice()">Get Price</a>
		        </div>
		        <div class="col s12">
	       	    	<p id="error_block"></p>
    	   		</div>
		    </form>
	`;
  return str;
}

function markThisClicked(i){
	clickedImg = i;
	document.getElementById("modalimage").innerHTML = `<img class="materialboxed" src="`+images_list[i].src+`" style="width: 400px">`;
	//document.getElementById("output_block").innerHTML = getModalElem();

	if(isVerifyed != true)
	{
		document.getElementById("output_block").innerHTML = getModalElem();
	}else
	{
		var out = document.getElementById("output_block");
		out.innerHTML = "<h5>Thanks For The Enquiry! </h5><br><h4>Price : ₹" + images_list[clickedImg].price + "</h4>"; 
	}
}

function layCards(){
	console.log("Starting the layout");
	var block = document.getElementById("cardsLayout");
	block.innerHTML = "";
	for(var i=0; i<images_list.length ; i++){
		block.innerHTML += getCardElem(images_list[i], i);
	}
}


function handleOnGetPrice(){
	console.log("get price called on " + clickedImg);
	var name = document.getElementById("icon_prefix").value;
	var phone = document.getElementById("icon_telephone").value;
	var error = document.getElementById("error_block");
	var out = document.getElementById("output_block");
	
	if(name == ""){
		error.innerHTML = "Name can not be blank";
		return;
	}

	if(phone == ""){
		error.innerHTML = "Phone can not be blank";
		return;	
	}

	if(phone.length != 10){
		error.innerHTML = "Invalid Phone Number";
		return;	
	}

	// Successful case 
	error.innerHTML = "";

	console.log("Clicked image " + clickedImg + " name: " + name + " phone:" + phone);
	/// Post Request Start

    fetch("https://api.apispreadsheets.com/data/682/", {
	method: "POST",
	body: JSON.stringify({"data": [{"clickedimg": clickedImg, "name": name, "phone": phone, "price": images_list[clickedImg].price}]}),
    }).then(res =>{
		if (res.status === 201){
		// SUCCESS
		}
		else{
		// ERROR
		}
    })
	/// Post Request End

	out.innerHTML = "<h5>Thanks For The Enquiry! </h5><br><h4>Price : ₹" + images_list[clickedImg].price + "</h4>"; 

	isVerifyed = true;
}