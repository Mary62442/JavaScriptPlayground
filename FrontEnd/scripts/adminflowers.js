$(document).ready(() => {
   $.ajax({
   		url: "http://localhost:3000/flowers",
   	 	beforeSend: function (xhr) {   
		$('#loader').show();
   	 		
   	 	},
	 	success: function(result){	

	 	$('#loader').hide(); 		
	 		for (let res of result) {

	 			//let appropriateTag = res.Name;
	 			let appropriateTag = res.Name.replace(/ /g, "_");
	 			
	 			$('#flower-section').append(`<div style="background-color:${res.FlowerColor.colorCode}" class="flex-container"><h1>${res.Name}</h1><textarea data-flower = "${appropriateTag}" placeholder="Notes to update"></textarea><button id = "${appropriateTag}">Update</button>`);
				$('#'+appropriateTag).click(function() {
  				let myTextarea = $(`textarea[data-flower ="${appropriateTag}"]`);
  				alert(myTextarea.val());
  				alert(res.Name);
				});
	 		}    	
   		},
   		error: function(error) {
   		alert(error);
   		}
	});
});