function getViewEvent(){
  $.ajax({url: "../../func/viewEvent.php",    
    beforeSend: function() {
        $(".allEvent").html('<div class="loader"></div>');
    }, success: function(response){
    // console.log(response);
    var data = $.parseJSON(response);
    
    if(data.result == 1 && data.role == "admin"){
        var html = "";
        if(data.data.length == 0)
        html +='<span class="badge badge-pill badge-danger">No Event</span>';             
        else{
        $(data.data).each(function (index, event) {
            var escapeTitle = escape(event.title);
            var escapeContent = escape(event.content);
            
            html += '<div class="col-12 list">';
            html += '<div class="card d-flex flex-row mb-3">';
            html += '<div class="d-flex flex-grow-1 min-width-zero">';
            html += '<div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">';
            html += '<a class="list-item-heading mb-1 truncate w-40 w-xs-100" href="#" data-toggle="modal" data-target="#viewEventModal" onclick="viewEventModal('+event.id+',\''+escapeTitle+'\',\''+escapeContent+'\',\''+event.time+'\',\''+event.venue+'\')">';
            html += event.title;
            html += '</a>';
            html += '<p class="mb-1 text-white text-small w-15 w-xs-100">' + event.category + '</p>';
            html += '<p class="mb-1 text-white text-small w-15 w-xs-100">' + event.date + '</p>';
            html += '</div>';
            html += '<div class="custom-control mb-0 align-self-center mr-4" style="display:inline-grid;">';
            html += '<button type="button" class="btn btn-outline-warning mt-2 mb-2" data-toggle="modal" data-backdrop="static" data-target="#editEventModal" onclick="viewEditModal('+event.id+',\''+escapeTitle+'\',\''+escapeContent+'\',\''+event.category_id+'\',\''+event.time+'\',\''+event.date+'\',\''+event.venue+'\')">Edit</button>';
            html += '<button type="button" class="btn btn-outline-danger mb-2" onclick="deleteEvent('+event.id+')">Delete</button>';
            html += '</div></div></div></div>';
        });
        }
        
        $(".allEvent").html(html);
    }else if(data.result == 1 && data.role == "member") {
        if(data.data.length === 0)
        html +='<span class="badge badge-pill badge-danger">No Event</span>';             
        else{
        html += '<div class="row icon-cards-row">';
        $(data.data).each(function (index, event) {
            var escapeTitle = escape(event.title);
            var escapeContent = escape(event.content);
            
            // html += '<div class="col-xs-6 col-lg-3 col-12 mb-4">';
            // html += '<div class="card" data-toggle="modal" data-target="#eventModal">';
            // html += '<div class="position-relative">';
            // html += '<img class="card-img-top" src="../../img/test1.jpg" alt="News Image">';
            // html += '<span class="badge badge-pill badge-theme-1 position-absolute badge-top-left">EVENT</span>';
            // html += '<span class="badge badge-pill badge-custom position-absolute badge-top-left-2">Games</span>';
            // html += '</div>';
            
            html += '<div class="card-body">';
            html += '<p class="list-item-heading mb-4">'+ event.title + '</p>';
            html += '<footer><p class="text-muted text-small mb-0 font-weight-light">09.04.2018</p></footer>';
            html += '</div></div><div></div>';
        });
        }
        html += '</div>';
        $(".allEvent").html(html);
    }
  }});
}

function getPic(id){
    $.ajax({
        url: '../../func/viewEventPic.php',
        type: 'post',
        data: { id : id},
        beforeSend: function() {
            $('.owl-carousel').hide();
            $(".picLoading").html('<div class="loader"></div>');
        }, success: function(response){
            var data = $.parseJSON(response);
            console.log(data.data);
            if(data.result == 1){
                var pic = "";
                $(".picLoading").html('');
                if(data.data.length != 0){
                    for(i=0;i<data.data.length;i++){
                        pic += '<img class="card-img" src="data:image/png;base64,'+data.data[i]+'">';
                    }                                          
                   
    
                    $("#viewE_pic").html(pic);
                    $('.owl-carousel.owl-hidden').css("opacity",1);
                    $('.owl-carousel').show();
                    var $owl = $('.owl-carousel');
                    $owl.trigger('destroy.owl.carousel');
                    $owl.owlCarousel({
                        items:1,
                        loop:true,
                        autoplay:true,
                        autoplaySpeed:2000,
                        autoplayHoverPause:true
                    });
                }
            }
        }
    });    
}

function viewEventModal(id,title,content,time,venue){
    $("#viewE_title").html(unescape(title));
    $("#viewE_content").html(unescape(content));
    var array_time = time.split(':');
    $("#viewE_time").html(array_time[0] + ":" + array_time[1]);
    $("#viewE_venue").html(venue);    
    getPic(id);
}

function viewEditModal(id,title,content,category,time,date,venue){
	$("#upload_pic").val(null);
    $("#editE_id").val(null);    
    $("#editE_title").html('');
    $("#upload-result").html(''); 
    
    $("#editE_id").val(id);
    $("#editE_title").val(unescape(title));    
    $("#editE_content").val(unescape(content));        
    $("#editE_category").val(category);    
    $("#editE_time").val(time);      
    $("#editE_date").val(date);
    $("#editE_venue").val(venue);       
}

function deleteEvent(id){
   $.ajax({
        url: '../../func/deleteEvent.php',
        type: 'post',
        data: { id : id},
        success: function(response){
            var data = $.parseJSON(response);
            console.log(data.data);
            getViewEvent();
        }
    });        
}

function editEvent(){
    var form_data = new FormData();
	var ins = document.getElementById('upload_pic').files.length;
	for (var x = 0; x < ins; x++) {
		form_data.append("upload_pic[]", document.getElementById('upload_pic').files[x]);
	}
	var id = $("#editE_id").val();
	
	form_data.append("id", id);
	form_data.append("title", $("#editE_title").val());
	form_data.append("content", $("#editE_content").val());
	form_data.append("category", $("#editE_category").val());
	form_data.append("venue", $("#editE_venue").val());
	form_data.append("time", $("#editE_time").val());
	form_data.append("date", $("#editE_date").val());	
	$.ajax({
		url: '../../func/editEvent.php', // point to server-side PHP script 
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
                          getViewEvent();
                            $("#editE_id").val("");
                            $("#editE_title").val("");    
                            $("#editE_content").val("");        
                            $("#editE_category").val("");    
                            $("#editE_time").val("");      
                            $("#editE_date").val("");
                            $("#editE_venue").val("");     
                            $("#upload_pic").val("");
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

function addEvent(){
    var form_data = new FormData();
	var ins = document.getElementById('addUpload_pic').files.length;
	for (var x = 0; x < ins; x++) {
		form_data.append("upload_pic[]", document.getElementById('addUpload_pic').files[x]);
	}
	
	form_data.append("title", $("#addE_title").val());
	form_data.append("content", $("#addE_content").val());
	form_data.append("category", $("#addE_category").val());
	form_data.append("venue", $("#addE_venue").val());
	form_data.append("time", $("#addE_time").val());
	form_data.append("date", $("#addE_date").val());	
	$.ajax({
		url: '../../func/addEvent.php', // point to server-side PHP script 
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
                          getViewEvent();
                        $("#addE_title").val("");    
                        $("#addE_content").val("");        
                        $("#addE_category").val("");    
                        $("#addE_time").val("");      
                        $("#addE_date").val("");
                        $("#addE_venue").val("");     
                        $("#addUpload_pic").val(""); 
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

function getAllCategory(){
  $.ajax({url: "../../func/viewAllPostCategory.php",    
  success: function(response){
    var data = $.parseJSON(response)
    console.log(data);
    if(data.result == 1){
        var html = "";
        if(data.data.length != 0){
            $(data.data).each(function (index, category) {
                $("#editE_category").append('<option value="'+category.id+'">'+category.name+'</option>');
                $("#addE_category").append('<option value="'+category.id+'">'+category.name+'</option>');
            });
        } 
    }
  }});    
}

$(document).ready(function(){
    getViewEvent();
    getAllCategory();
});