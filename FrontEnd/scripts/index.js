$("#bt").click(() => {
   $.ajax({
   	url: "http://localhost:3000/flowers",
   	 beforeSend: function (xhr) {

   	 	//alert('This is firing before sending the request')
   	 },
	 success: function(result){

	 	$("#bt").hide();

	 	console.log(result);


	 	for (let res of result) {

	 		let initImg = res.ImagePath;	 		
	 		let cutImg = initImg.substr(5);	 		
	 		let webRoot = 'http://www.dmm888.com';
	 		let newImg = webRoot.concat(cutImg);

	 		$('#sec').append('<h1 class="heading" >' + res.Name + '</h1>');
	 		$('#sec').append('<div class ="flower" ><div class="description">' + 
	 			res.Description + '</div><img class = "image" src = "'+ newImg + '"></div>');

	 	}




   	
    $("#section1").html(JSON.stringify(result));
   },

   error: function(error) {
   	alert(error);
   }


});
});


