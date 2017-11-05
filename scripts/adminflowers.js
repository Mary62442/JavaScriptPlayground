$(document).ready(() => {
   $.ajax({
   		url: "http://localhost:3000/flowers",
   	 	beforeSend:  (xhr)=> {   
		$('#loader').show();
   	 		
   	 	},
	 	success: (result)=>{	

	 	$('#loader').hide(); 		
	 		for (let res of result) {

	 			//let appropriateTag = res.Name;
	 			let appropriateTag = res.Name.replace(/ /g, "_");
	 			
	 			$('#flower-section').append(`<div style="background-color:${res.FlowerColor.colorCode}" class="flex-container"><h1>${res.Name}</h1><textarea data-flower = "${appropriateTag}" placeholder="Notes to update">${res.Notes}</textarea><button id = "${appropriateTag}">Update</button>`);
				$('#'+appropriateTag).click(() => {
  					let notesTextarea = $(`textarea[data-flower ="${appropriateTag}"]`);
  					let flowerName = res.Name;
  					// *** Ajax call invoked when the update button is clicked
  					$.ajax({
  						url: 'http://localhost:3000/updateflowernotes',
  						method: 'POST',
  						data: { Name:flowerName, Notes:notesTextarea.val() },
              headers: { 'Authorization':'Basic ' + btoa('diego:secret')},
  						success: (response) =>{
                
  							alert(response);
  						},
  						error: (error)=> {
   							alert(error);
   						}
  					});
  					// *** End Ajax call
				});
	 		}    	
   		},
   		error: (error) =>{
   		alert(error);
   		}
	});
});