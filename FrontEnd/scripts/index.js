$(document).ready(() => {
   $.ajax({
   		url: "http://localhost:3000/flowers",
   	 	beforeSend: function (xhr) {


   	 		$('#page').hide();
   	 		$('#loader').show();

   	 	//alert('This is firing before sending the request')
   	 	},
	 	success: function(result){

	 		
	 		$('#loader').fadeOut(200);	 	
	 		$('#page').fadeIn(400).delay(200);

	 		for (let res of result) {

	 			let initImg = res.ImagePath;	 		
	 			let cutImg = initImg.substr(5);	 		
	 			let webRoot = 'http://www.dmm888.com';
	 			let newImg = webRoot.concat(cutImg);

	 			$('#all-flowers').append('<h1 class="heading" >' + res.Name + '</h1>');
	 			$('#all-flowers').append('<div class ="flower" ><div class="description">' + 
	 			res.Description + '</div><img class = "image" src = "'+ newImg + '"></div>');

	 		}

   	
    	$("#sec").html(JSON.stringify(result));
   		},

   		error: function(error) {
   		alert(error);
   		}
	});

   $('#search-form').submit((event) => {
   	$('#friendly-err').hide();

   		let formData = $('#search-form').serializeArray();   	   		
   		$.ajax({
	   		url: "http://localhost:3000/flower",
	   		data : formData,   	 	
		 	success: function(result){


		 		if (result.hasOwnProperty('Name')) {				
		 		let initImg = result.ImagePath;	 		
	 			let cutImg = initImg.substr(5);	 		
	 			let webRoot = 'http://www.dmm888.com';
	 			let newImg = webRoot.concat(cutImg);

	 			$('#searched-flowers').append('<h1 class="heading" >' + result.Name + '</h1>');
	 			$('#searched-flowers').append('<div class ="flower" ><div class="description">' + 
	 			result.Description + '</div><img class = "image" src = "'+ newImg + '"></div>');

		 		}

		 		else {
		 			$('#friendly-err').show();
		 		}

		 		
		 		
		 	},
		 	error: function(error) { alert(error); }
		});
   		event.preventDefault();

   	});
});


