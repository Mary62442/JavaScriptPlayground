$(document).ready(() => {
   $.ajax({
   		url: "http://localhost:3000/flowers",
   	 	beforeSend: function (xhr) {   	 		
   	 		$('#loader').show();

   	 	//alert('This is firing before sending the request')
   	 	},
	 	success: function(result){

	 		
	 		$('#loader').fadeOut(200);	 	
	 		$('#page').fadeIn(200).delay(600);

	 		for (let res of result) {
	 			
	 			$('#all-flowers').append('<h1 class="heading" >' + res.Name + '</h1>');
	 			$('#all-flowers').append('<div class ="flower" ><div class="description">' 
	 			+ res.Description + '</div><img class = "image" style="background-color:'
	 			+ res.FlowerColor.colorCode + '" src = "'+ res.ImagePath + '"></div>');

	 		}

   	
    	
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

		 		$('#found-flower').remove();

		 		if (result.hasOwnProperty('Name')) {				
		 		
	 			$('#search-container').append('<div id="found-flower"><h1 class="heading-found" >' 
	 			+ result.Name + 
	 			'</h1> <div class ="flower-found" > <div class="description-found">' + 
	 			result.Description + 
	 			'</div><img class = "image-found" src = "'+ 
	 			result.ImagePath + '"></div></div>');

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


