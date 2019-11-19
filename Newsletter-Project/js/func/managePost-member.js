function getViewApprovedPost(){
  $.ajax({url: "../../func/viewApprovedUserPost.php",    
    beforeSend: function() {
        $(".approvedPost").html('<div class="loader"></div>');
    }, success: function(response){
    var data = $.parseJSON(response)
    console.log(data);
    if(data.result == 1 && data.role == "member"){
        var html = "";
        if(data.data.length == 0)
        html +='<span class="badge badge-pill badge-danger">No Approved Post</span>';             
        else{
        $(data.data).each(function (index, post) {
            var escapeTitle = escape(post.title);
            var escapeContent = escape(post.content);            
            
            html += '<div class="card d-flex flex-row mb-3">';
            html += '<div class="d-flex flex-grow-1 min-width-zero">';
            html += '<div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">';
            html += '<a class="list-item-heading mb-1 truncate w-40 w-xs-100" href="#" data-toggle="modal" data-target="#viewPostModal" onclick="viewPostModal('+post.id+',\''+escapeTitle+'\',\''+escapeContent+'\',\''+post.mname+'\');">'
            html += post.title;
            html += '</a>';
            html += '<p class="mb-1 text-black text-small w-15 w-xs-100">' + post.category + '</p>';
            html += '<p class="mb-1 text-black text-small w-15 w-xs-100">' + post.date + '</p>';
            html += '<div class="w-15 w-xs-100">'
            html += '<span class="badge badge-pill badge-secondary">Approved</span>';
            html += '</div>';
            html += '</div>';
            html += '<div class="custom-control mb-0 align-self-center mr-4" style="display:inline-grid;">';
            html += '<button type="button" class="btn btn-outline-warning mt-2 mb-2" data-toggle="modal" data-backdrop="static" data-target="#editPostModal" onclick="viewEditModal('+post.id+','+post.categoryId+',\''+escapeTitle+'\',\''+escapeContent+'\');">Edit</button>';
            html += '<button type="button" class="btn btn-outline-danger mb-2" onclick="deletePost('+post.id+');">Delete</button>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
        });
        }
        
        $(".approvedPost").html(html);
    }
  }});
}

function getViewDisapprovedPost(){
  $.ajax({url: "../../func/viewDisapprovedUserPost.php",    
    beforeSend: function() {
        $(".disapprovedPost").html('<div class="loader"></div>');
    }, success: function(response){
    var data = $.parseJSON(response)
    console.log(data);
    if(data.result == 1 && data.role == "member"){
        var html = "";
        if(data.data.length == 0)
        html +='<span class="badge badge-pill badge-danger">No Disapproved Post</span>';             
        else{
        $(data.data).each(function (index, post) {
            var escapeTitle = escape(post.title);
            var escapeContent = escape(post.content);             
            
            html += '<div class="card d-flex flex-row mb-3">';
            html += '<div class="d-flex flex-grow-1 min-width-zero">';
            html += '<div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">';
            html += '<a class="list-item-heading mb-1 truncate w-40 w-xs-100" href="#" data-toggle="modal" data-target="#viewPostModal" onclick="viewPostModal('+post.id+',\''+escapeTitle+'\',\''+escapeContent+'\',\''+post.mname+'\');">'
            html += post.title;
            html += '</a>';
            html += '<p class="mb-1 text-black text-small w-15 w-xs-100">' + post.category + '</p>';
            html += '<p class="mb-1 text-black text-small w-15 w-xs-100">' + post.date + '</p>';
            html += '<div class="w-15 w-xs-100">'
            html += '<span class="badge badge-pill badge-warning">Waiting for approval</span>';
            html += '</div>';
            html += '</div>';
            html += '<div class="custom-control mb-0 align-self-center mr-4" style="display:inline-grid;">';
            html += '<button type="button" class="btn btn-outline-warning mt-2 mb-2" data-toggle="modal" data-backdrop="static" data-target="#editPostModal" onclick="viewEditModal('+post.id+','+post.categoryId+',\''+escapeTitle+'\',\''+escapeContent+'\');">Edit</button>';
            html += '<button type="button" class="btn btn-outline-danger mb-2" onclick="deletePost('+post.id+');">Delete</button>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
        });
        }
        
        $(".disapprovedPost").html(html);
    }
  }});
}


function viewPostModal(id,title,content,username){
    $("#viewP_title").html(unescape(title));
    $("#viewP_content").html(unescape(content));
    $("#viewP_author").html("By " + username);
    getPic(id);
}

function getPic(id){
    $.ajax({
        url: '../../func/viewPostPic.php',
        type: 'post',
        data: { id : id},
        beforeSend: function() {
            $("#viewP_img").html('');
            $(".picLoading").html('<div class="loader"></div>');
        }, success: function(response){
            var data = $.parseJSON(response);
            $(".picLoading").html('');
            if(data.result == 1){
                var pic = "";
                if(data.data != ""){
                        pic = '<img class="card-img img-responsive" src="data:image/png;base64,'+data.data+'"> <br><br>';
                }
                $("#viewP_img").html(pic);
            }
        }
    });    
}



function viewEditModal(id,category,title,content){
    $("#editP_id").val(id);
    $("#editP_title").val(unescape(title));
    $("#editP_content").val(unescape(content));
    $("#editP_category").val(category);
}

function getAllCategory(){
  $.ajax({url: "../../func/viewAllPostCategory.php",    
  success: function(response){
    var data = $.parseJSON(response)
    console.log(data);
    if(data.result == 1 && data.role == "member"){
        var html = "";
        if(data.data.length != 0){
            $(data.data).each(function (index, category) {
                $("#addP_category").append('<option value="'+category.id+'">'+category.name+'</option>');
                $("#editP_category").append('<option value="'+category.id+'">'+category.name+'</option>');
                $("#share_category").append('<option value="'+category.id+'">'+category.name+'</option>');
            });
        } 
    }
  }});    
}

function editPost(){
    var form_data = new FormData();
	form_data.append("pic", document.getElementById('editP_pic').files[0]);
	form_data.append("id",$("#editP_id").val());
	form_data.append("title", $("#editP_title").val());
	form_data.append("category",$("#editP_category").val());
	form_data.append("content", $("#editP_content").val());	
	
	$.ajax({
		url: '../../func/editPost.php',
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
                  title: "Successfully Edit!",
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
        		    $("#editP_pic").val(null);
        		    $("#editP_id").val(null);
        		    $("#editP_title").val(null);
        		    $("#editP_content").val(null);
        		    $("#editP_category").val(null);                      
                    getViewApprovedPost();
                    getViewDisapprovedPost(); 
                    getViewArchivePost();
                    getAllCategory();    
                  }
                })			    
			}
			else{
                swal({
                  title: "Fail to edit!",
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

function addPost(){
    var form_data = new FormData();
	form_data.append("pic", document.getElementById('addP_pic').files[0]);
	form_data.append("title", $("#addP_title").val());
	form_data.append("category",$("#addP_category").val());
	form_data.append("content", $("#addP_content").val());	
	
	$.ajax({
		url: '../../func/addUserPost.php',
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
                  title: "Successfully Added!",
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
        		    $("#addP_pic").val(null);
        		    $("#addP_title").val(null);
        		    $("#addP_content").val(null);
        		    $("#addP_category").val(null);                      
                    getViewApprovedPost();
                    getViewDisapprovedPost(); 
                  }
                })			    
			}
			else{
                swal({
                  title: "Fail to add!",
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

function sharePost(){
    var content = $("#share_url").val();
    var form_data = new FormData();
	form_data.append("pic", document.getElementById('share_pic').files[0]);
	form_data.append("title", $("#share_title").val());
	form_data.append("category",$("#share_category").val());
	form_data.append("content", "Go to this link: <a href='"+content+"'>" + content + "</a>" );	
	
	$.ajax({
		url: '../../func/sharePost.php',
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
                  title: "Successfully Share!",
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
        		    $("#share_pic").val(null);
        		    $("#share_title").val(null);
        		    $("#share_url").val(null);
        		    $("#share_category").val(null);                      
                    getViewApprovedPost();
                    getViewDisapprovedPost(); 
                  }
                })			    
			}
			else{
                swal({
                  title: "Fail to share!",
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


function deletePost(id){
   $.ajax({
        url: '../../func/deletePost.php',
        type: 'post',
        data: { id : id},
        success: function(response){
            var data = $.parseJSON(response);
            console.log(data.data);
            getViewApprovedPost();
            getViewDisapprovedPost(); 
        }
    });        
}

$(document).ready(function(){
    getViewApprovedPost();
    getViewDisapprovedPost(); 
    getAllCategory();
});