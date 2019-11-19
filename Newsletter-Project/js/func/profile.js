function getProfile(){
    $.ajax({
        url: '../../func/viewProfile.php',
        success: function(response){
            var data = $.parseJSON(response);
            console.log(data);
            if(data.result == 1){
                if(data.data.length == 1){
                    $("#profile-name").val(data.data[0].username);  
                    $("#profile-email").val(data.data[0].email);
                }

            }
        }
    });        
}

function getProfilePic(){
    $.ajax({
        url: '../../func/viewProfilePic.php',
        success: function(response){
            var data = $.parseJSON(response);
            if(data.result == 1){
                var pic = "";
                if(data.data != ""){
                    $("#pp-img").attr("src",'data:image/png;base64,'+data.data);
                }
            }
        }
    });    
}

function updateProfile(){
    var form_data = new FormData();
	form_data.append("pic", document.getElementById('profile-pic').files[0]);
	form_data.append("name", $("#profile-name").val());
	form_data.append("email",$("#profile-email").val());
	
	$.ajax({
		url: '../../func/updateProfile.php',
		cache: false,
		contentType: false,
		processData: false,
		data: form_data,
		type: 'post',
		success: function (response) {
			console.log(response);
			var data = $.parseJSON(response);
			if(data.result == 1){
                swal({
                  title: "Successfully Update!",
                  text: ":)",
                  type: "success",
                  timer: 2000,
                  closeOnClickOutside: false,
                  closeOnEsc: false,
                  allowOutsideClick: false,                      
                  showConfirmButton: false
                }).then((result) => {
                  if (
                    // Read more about handling dismissals
                    result.dismiss === Swal.DismissReason.timer
                  ) {
        		    $("#profle-pic").val(null);
                    getProfilePic();
                  }
                })			    
			}
			else{
                swal({
                  title: "Fail to update!",
                  text: "Check your inputs :(",
                  type: "error",
                  timer: 2000,
                  closeOnClickOutside: false,
                  closeOnEsc: false,
                  allowOutsideClick: false,                      
                  showConfirmButton: false
                }).then((result) => {
                  if (
                    // Read more about handling dismissals
                    result.dismiss === Swal.DismissReason.timer
                  ) {
                      
                  }
                })				    
			}
			
		},
		error: function (response) {
			console.log(response);
		}
	});
}

function updatePass(){
    var form_data = new FormData();
	form_data.append("new-pass", $("#new-pass").val());
	form_data.append("old-pass",$("#old-pass").val());
	
	$.ajax({
		url: '../../func/updatePass.php',
		cache: false,
		contentType: false,
		processData: false,
		data: form_data,
		type: 'post',
		success: function (response) {
			console.log(response);
			var data = $.parseJSON(response);
			if(data.result == 1){
                swal({
                  title: "Successfully Change!",
                  text: ":)",
                  type: "success",
                  timer: 2000,
                  closeOnClickOutside: false,
                  closeOnEsc: false,
                  allowOutsideClick: false,                      
                  showConfirmButton: false
                }).then((result) => {
                  if (
                    result.dismiss === Swal.DismissReason.timer
                  ) {
        		    $("#new-pass").val(null);                      
        		    $("#old-pass").val(null);
                  }
                })			    
			}
			else{
                swal({
                  title: "Fail to change!",
                  text: "Check your inputs :(",
                  type: "error",
                  timer: 2000,
                  closeOnClickOutside: false,
                  closeOnEsc: false,
                  allowOutsideClick: false,                      
                  showConfirmButton: false
                }).then((result) => {
                  if (
                    // Read more about handling dismissals
                    result.dismiss === Swal.DismissReason.timer
                  ) {
                      
                  }
                })				    
			}
			
		},
		error: function (response) {
			console.log(response);
		}
	});
}

$(document).ready(function(){
    getProfile();
    getProfilePic();
});