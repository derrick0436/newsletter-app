$('#inv-stuid').keypress(function (e) {
  if (e.which == 13) {
	var stuid = $("#inv-stuid").val();
	var eventid = $("#event-id").val();      
    $.ajax({
        url: '../../func/invite.php',
        type: 'post',
        data: {stuid : stuid, eventid : eventid},
        success: function(response){
            var data = $.parseJSON(response);
            if(data.result == 1){
                swal({
                  title: "Succesfully Sent Invite!",
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
                      
                  }
                })	
                $("#inv-stuid").val("");
            }
            else{
                swal({
                  title: "Fail to Invite!",
                  text: "Check your inputs/Members Not Found/Invited before/Can't invite yourself :(",
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
                $("#inv-stuid").val("");
            }
        }
    });   
    return false;
  }
});

$('#pc-text').keypress(function (e) {
  if (e.which == 13) {
	var text = $("#pc-text").val();
	var id = $("#pc-id").val();      
    $.ajax({
        url: '../../func/addPostComment.php',
        type: 'post',
        data: {text : text, id : id},
        success: function(response){
            var data = $.parseJSON(response);
            if(data.result == 1){
                getViewPostComment(id);
                $("#pc-text").val("");
            }
            else{
                swal({
                  title: "Fail to Leave a Comment!",
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
                $("#pc-text").val("");
            }
        }
    });   
    return false;
  }
});

function getLikeCount(id){
    $.ajax({
        url: '../../func/viewLikePost.php',
        type: 'post',
        data: { id : id},
        success: function(response){
            var data = $.parseJSON(response);
            eventpic = "";
            if(data.result == 1){
                $(".like-count").html(data.data);    
            }
        }
    });    
}

function likePost(){
    var id = $("#pc-id").val();
    $.ajax({
        url: '../../func/likePost.php',
        type: 'post',
        data: { id : id},
        success: function(response){
            var data = $.parseJSON(response);
            console.log(data);
            if(data.result == 1){
                checkLiked(id);
                getLikeCount(id);
            }
        }
    });    
}

function checkLiked(id){
    $.ajax({
        url: '../../func/checkLiked.php',
        type: 'post',
        data: { id : id},
        success: function(response){
            var data = $.parseJSON(response);
            console.log(data);
            if(data.result == 1){
                if(data.data == 1){
                    $(".btn-like").removeClass("btn-outline-secondary");     
                    $(".btn-like").addClass("btn-primary");                      
                }
                else{
                    $(".btn-like").removeClass("btn-primary");  
                    $(".btn-like").addClass("btn-outline-secondary");                        
                }

            }
        }
    });    
}

function getCategory(){
  $.ajax({url: "../../func/viewCategory.php",    
    success: function(response){
    var data = $.parseJSON(response)
    console.log(data);
    var html = "";
    if(data.data.length == 0)
    html +='<a class="dropdown-item" href="#"></a>';
    else{
    $(data.data).each(function (index, category) {
        html += '<a class="dropdown-item" href="#" onclick="viewEventByCategory('+category.id+');viewPostByCategory('+category.id+');return false;">' + category.name+'</a>';
    });
                
    }
    
    $("#categoryMenu").html(html);
  }});    
}
var eventpic = "";
var postpic = "";
function getEventOnePic(id){
    $.ajax({
        url: '../../func/viewEventOnePic.php',
        type: 'post',
        async:false,
        data: { id : id},
        success: function(response){
            var data = $.parseJSON(response);
            eventpic = "";
            if(data.result == 1){
                if(data.data.length != 0){
                    eventpic = data.data;
                }
            }
        }
    });    
}

function viewEvent(){
  $.ajax({url: "../../func/viewEventAFTDATE.php",
    beforeSend: function() {
        $("#allEvent").html('<div class="loader"></div>');
    }, 
    async:false,
    success: function(response){
    var data = $.parseJSON(response)
    var html = "";
    if(data.data.length == 0)
    html +='<span class="badge badge-pill badge-danger mb-2">No Event</span>';
    else{
    $(data.data).each(function (index, event) {
        getEventOnePic(event.id);
        if(eventpic == "")
        eventpic = "../../img/eventpic.png";
        else
        eventpic = "data:image/png;base64," + eventpic;
        
        var escapeTitle = escape(event.title);
        var escapeContent = escape(event.content);
        
        html += '<div class="col-xs-6 col-lg-3 col-12 mb-4">';
        html += '<div class="card" data-toggle="modal" data-target="#eventModal" onclick="viewEventModal('+event.id+',\''+escapeTitle+'\',\''+escapeContent+'\',\''+event.time+'\',\''+event.venue+'\')">';
        html += '<div class="position-relative img200">';
        html += '<img class="card-img-top" src="'+eventpic+'" alt="News Image">';
        html += '<span class="badge badge-pill badge-theme-1 position-absolute badge-top-left">EVENT</span>';
        html += '<span class="badge badge-pill badge-custom position-absolute badge-top-left-2">'+event.category+'</span>'; 
        html += '</div>';
        html += '<div class="card-body">';
        html += '<p class="list-item-heading mb-4">'+event.title+'</p>';
        html += '<footer><p class="text-muted text-small mb-0 font-weight-light">'+event.date+'</p></footer>';
        html += '</div></div></div>';  
    });
                
    }
    
    $("#allEvent").html(html);
  }});    
}

function getPostOnePic(id){
    $.ajax({
        url: '../../func/viewPostPic.php',
        type: 'post',
        async:false,
        data: { id : id},
        success: function(response){
            var data = $.parseJSON(response);
            if(data.result == 1){
                postpic = "";
                if(data.data != ""){
                        postpic = data.data;
                }
            }
        }
    });    
}

function viewPost(){
  $.ajax({url: "../../func/viewApprovedPostThisWeek.php",
    beforeSend: function() {
        $("#allPost").html('<div class="loader"></div>');
    }, 
    async:false,
    success: function(response){
    var data = $.parseJSON(response)
    var html = "";
    if(data.data.length == 0)
    html +='<span class="badge badge-pill badge-danger mb-2">No post</span>';
    else{
    $(data.data).each(function (index, post) {
        getPostOnePic(post.id);
        
        var escapeTitle = escape(post.title);
        var escapeContent = escape(post.content);
        
        html += '<div class="col-xs-6 col-lg-3 col-12 mb-4">';
        html += '<div class="card" data-toggle="modal" data-target="#articleModal" onclick="viewPostModal('+post.id+',\''+escapeTitle+'\',\''+escapeContent+'\',\''+post.mname+'\',\''+post.email+'\',\''+post.stuid+'\');">';
        html += '<div class="position-relative img200">';
        html += '<img class="card-img-top" src="data:image/png;base64,'+postpic+'" alt="News Image">';
        html += '<span class="badge badge-pill badge-theme-1 position-absolute badge-top-left">POST</span>';
        html += '<span class="badge badge-pill badge-custom position-absolute badge-top-left-2">'+post.category+'</span>'; 
        html += '</div>';
        html += '<div class="card-body">';
        html += '<p class="list-item-heading mb-4">'+post.title+'</p>';
        html += '<footer><p class="text-muted text-small mb-0 font-weight-light">'+post.date+'</p></footer>';
        html += '</div></div></div>';  
    });
                
    }
    
    $("#allPost").html(html);
  }});    
}

function getViewPostComment(id){
  $.ajax({url: "../../func/viewPostComment.php",    
    type: 'post',
    data: { id : id},  
    beforeSend: function() {
        $(".postcomment").html('<div class="loader"></div>');
    }, success: function(response){
    var data = $.parseJSON(response)
    console.log(data);
    if(data.result == 1 && data.role == "member"){
        var html = "";
        if(data.data.length == 0)
        html +='<span class="badge badge-pill badge-danger">No Post Comment</span>';             
        else{
        $(data.data).each(function (index, pc) {
            
            html += '<div class="card col-12 mb-3">';
            html += '<div class="card-body">';
            
            html += '<div class="d-flex flex-row pb-2">';
            html += '<div class="d-flex flex-grow-1 min-width-zero">';
            html += '<div class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">';
            html += '<div class="min-width-zero">';
            html += '<p class="mb-0 list-item-heading truncate">'+ pc.username+' <span class="text-muted" style="font-size:10px;">('+pc.date+')</span></p>';
            html += '</div></div></div></div>';
            
            html += '<div class="text-left ml-2" >';
            html += '<p class="mb-0 text-semi-muted">';
            html += pc.comment;
            html += '</p>';
            html += '</div>';
            
            html += '</div></div>';
        });
        }
        $("#pc-id").val(id);
        $(".postcomment").html(html);
    }
  }});
}

function getEventPic(id){
    $.ajax({
        url: '../../func/viewEventPic.php',
        type: 'post',
        data: { id : id},
        beforeSend: function() {
            $('.owl-carousel').hide();
            $(".event-picLoading").html('<div class="loader"></div>');
        }, success: function(response){
            var data = $.parseJSON(response);
            console.log(data);
            if(data.result == 1){
                var pic = "";
                $(".event-picLoading").html('');
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

function getPostPic(id){
    $.ajax({
        url: '../../func/viewPostPic.php',
        type: 'post',
        data: { id : id},
        beforeSend: function() {
            $("#viewP_img").html('');
            $(".post-picLoading").html('<div class="loader"></div>');
        }, success: function(response){
            var data = $.parseJSON(response);
            $(".post-picLoading").html('');
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



function viewEventModal(id,title,content,time,venue){
    $("#viewE_title").html(unescape(title));
    $("#viewE_content").html(unescape(content));
    var array_time = time.split(":");
    $("#viewE_time").html(array_time[0] + ":" + array_time[1]);
    $("#viewE_venue").html(venue);    
    $("#event-id").val(id);
    checkJoinedEvent(id);
    getEventPic(id);
}

function viewPostModal(id,title,content,username,email,stuid){
    $("#viewP_title").html(unescape(title));
    $("#viewP_content").html(unescape(content));
    $("#viewP_author").html("By " + username);
    $("#auInfo_stuid").html("Student ID: " + stuid);
    $("#auInfo_email").html("Email: " + email);
    checkLiked(id);
    getLikeCount(id);
    getViewPostComment(id);
    getPostPic(id);
}

function checkJoinedEvent(id){
    $.ajax({
        url: '../../func/checkJoinedEvent.php',
        type: 'post',
        data: { id : id},
        success: function(response){
            var data = $.parseJSON(response);
            console.log(data);
            if(data.result == 1){
                if(data.data == 1){
                    $("#btn-joinevent").html("Joined");     
                }
                else{
                    $("#btn-joinevent").html("Join Event");                        
                }

            }
        }
    });    
}

function joinEvent(){
    var id = $("#event-id").val();
    $.ajax({
        url: '../../func/joinEvent.php',
        type: 'post',
        data: { id : id},
        success: function(response){
            var data = $.parseJSON(response);
            console.log(data);
            if(data.result == 1){
                checkJoinedEvent(id);
                viewJoinedEvent();
            }
        }
    });    
}


function viewJoinedEvent(){
  $.ajax({url: "../../func/viewJoinedEvent.php", 
    type: 'post',
    beforeSend: function() {
        $("#allJoinedEvent").html('<div class="loader"></div>');
    }, success: function(response){
    var data = $.parseJSON(response)
    var html = "";
    if(data.data.length == 0)
    html +='<span class="badge badge-pill badge-danger mb-2">No Joined Event</span>';
    else{
    $(data.data).each(function (index, event) {
        getEventOnePic(event.id);
        if(eventpic == "")
        eventpic = "../../img/eventpic.png";
        else
        eventpic = "data:image/png;base64," + eventpic;
        
        var escapeTitle = escape(event.title);
        var escapeContent = escape(event.content);
        
        html += '<div class="col-xs-6 col-lg-3 col-12 mb-4">';
        html += '<div class="card" data-toggle="modal" data-target="#eventModal" onclick="viewEventModal('+event.id+',\''+escapeTitle+'\',\''+escapeContent+'\',\''+event.time+'\',\''+event.venue+'\')">';
        html += '<div class="position-relative img200">';
        html += '<img class="card-img-top" src="'+eventpic+'" alt="News Image">';
        html += '<span class="badge badge-pill badge-theme-1 position-absolute badge-top-left">EVENT</span>';
        html += '<span class="badge badge-pill badge-custom position-absolute badge-top-left-2">'+event.category+'</span>'; 
        html += '</div>';
        html += '<div class="card-body">';
        html += '<p class="list-item-heading mb-4">'+event.title+'</p>';
        html += '<footer><p class="text-muted text-small mb-0 font-weight-light">'+event.date+'</p></footer>';
        html += '</div></div></div>';  
    });
                
    }
    
    $("#allJoinedEvent").html(html);
  }});      
}   

function viewEventByCategory(id){
  $.ajax({url: "../../func/viewEventByCategory.php", 
    type: 'post',
    data: { categoryId : id},
    beforeSend: function() {
        $("#allEvent").html('<div class="loader"></div>');
    }, success: function(response){
    var data = $.parseJSON(response)
    var html = "";
    if(data.data.length == 0)
    html +='<span class="badge badge-pill badge-danger mb-2">No Event</span>';
    else{
    $(data.data).each(function (index, event) {
        getEventOnePic(event.id);
        if(eventpic == "")
        eventpic = "../../img/eventpic.png";
        else
        eventpic = "data:image/png;base64," + eventpic;
        
        var escapeTitle = escape(event.title);
        var escapeContent = escape(event.content);
        
        html += '<div class="col-xs-6 col-lg-3 col-12 mb-4">';
        html += '<div class="card" data-toggle="modal" data-target="#eventModal" onclick="viewEventModal('+event.id+',\''+escapeTitle+'\',\''+escapeContent+'\',\''+event.time+'\',\''+event.venue+'\')">';
        html += '<div class="position-relative img200">';
        html += '<img class="card-img-top" src="'+eventpic+'" alt="News Image">';
        html += '<span class="badge badge-pill badge-theme-1 position-absolute badge-top-left">EVENT</span>';
        html += '<span class="badge badge-pill badge-custom position-absolute badge-top-left-2">'+event.category+'</span>'; 
        html += '</div>';
        html += '<div class="card-body">';
        html += '<p class="list-item-heading mb-4">'+event.title+'</p>';
        html += '<footer><p class="text-muted text-small mb-0 font-weight-light">'+event.date+'</p></footer>';
        html += '</div></div></div>';  
    });
                
    }
    
    $("#allEvent").html(html);
  }});      
}    

function viewEventByMonth(id){
  $.ajax({url: "../../func/viewEventByMonth.php", 
    type: 'post',
    data: { month : id},
    beforeSend: function() {
        $("#allEvent").html('<div class="loader"></div>');
    }, success: function(response){
    var data = $.parseJSON(response)
    var html = "";
    if(data.data.length == 0)
    html +='<span class="badge badge-pill badge-danger mb-2">No Event</span>';
    else{
    $(data.data).each(function (index, event) {
        getEventOnePic(event.id);
        if(eventpic == "")
        eventpic = "../../img/eventpic.png";
        else
        eventpic = "data:image/png;base64," + eventpic;
        
        var escapeTitle = escape(event.title);
        var escapeContent = escape(event.content);
        
        html += '<div class="col-xs-6 col-lg-3 col-12 mb-4">';
        html += '<div class="card" data-toggle="modal" data-target="#eventModal" onclick="viewEventModal('+event.id+',\''+escapeTitle+'\',\''+escapeContent+'\',\''+event.time+'\',\''+event.venue+'\')">';
        html += '<div class="position-relative img200">';
        html += '<img class="card-img-top" src="'+eventpic+'" alt="News Image">';
        html += '<span class="badge badge-pill badge-theme-1 position-absolute badge-top-left">EVENT</span>';
        html += '<span class="badge badge-pill badge-custom position-absolute badge-top-left-2">'+event.category+'</span>'; 
        html += '</div>';
        html += '<div class="card-body">';
        html += '<p class="list-item-heading mb-4">'+event.title+'</p>';
        html += '<footer><p class="text-muted text-small mb-0 font-weight-light">'+event.date+'</p></footer>';
        html += '</div></div></div>';  
    });
                
    }
    
    $("#allEvent").html(html);
  }});      
}   

function viewPostByCategory(id){
  $.ajax({url: "../../func/viewApprovedPostByCategory.php",
    type: 'post',
    data: { categoryId : id},  
    beforeSend: function() {
        $("#allPost").html('<div class="loader"></div>');
    }, 
    success: function(response){
    var data = $.parseJSON(response)
    var html = "";
    if(data.data.length == 0)
    html +='<span class="badge badge-pill badge-danger mb-2">No post</span>';
    else{
    $(data.data).each(function (index, post) {
        getPostOnePic(post.id);
        
        var escapeTitle = escape(post.title);
        var escapeContent = escape(post.content);
        
        html += '<div class="col-xs-6 col-lg-3 col-12 mb-4">';
        html += '<div class="card" data-toggle="modal" data-target="#articleModal" onclick="viewPostModal('+post.id+',\''+escapeTitle+'\',\''+escapeContent+'\',\''+post.mname+'\');">';
        html += '<div class="position-relative img200">';
        html += '<img class="card-img-top" src="data:image/png;base64,'+postpic+'" alt="News Image">';
        html += '<span class="badge badge-pill badge-theme-1 position-absolute badge-top-left">POST</span>';
        html += '<span class="badge badge-pill badge-custom position-absolute badge-top-left-2">'+post.category+'</span>'; 
        html += '</div>';
        html += '<div class="card-body">';
        html += '<p class="list-item-heading mb-4">'+post.title+'</p>';
        html += '<footer><p class="text-muted text-small mb-0 font-weight-light">'+post.date+'</p></footer>';
        html += '</div></div></div>';  
    });
                
    }
    
    $("#allPost").html(html);
  }});     
}

function viewPostByMonth(id){
  $.ajax({url: "../../func/viewApprovedPostByMonth.php",
    type: 'post',
    data: { month : id},  
    beforeSend: function() {
        $("#allPost").html('<div class="loader"></div>');
    }, 
    success: function(response){
    var data = $.parseJSON(response)
    var html = "";
    if(data.data.length == 0)
    html +='<span class="badge badge-pill badge-danger mb-2">No post</span>';
    else{
    $(data.data).each(function (index, post) {
        getPostOnePic(post.id);
        
        var escapeTitle = escape(post.title);
        var escapeContent = escape(post.content);
        
        html += '<div class="col-xs-6 col-lg-3 col-12 mb-4">';
        html += '<div class="card" data-toggle="modal" data-target="#articleModal" onclick="viewPostModal('+post.id+',\''+escapeTitle+'\',\''+escapeContent+'\',\''+post.mname+'\');">';
        html += '<div class="position-relative img200">';
        html += '<img class="card-img-top" src="data:image/png;base64,'+postpic+'" alt="News Image">';
        html += '<span class="badge badge-pill badge-theme-1 position-absolute badge-top-left">POST</span>';
        html += '<span class="badge badge-pill badge-custom position-absolute badge-top-left-2">'+post.category+'</span>'; 
        html += '</div>';
        html += '<div class="card-body">';
        html += '<p class="list-item-heading mb-4">'+post.title+'</p>';
        html += '<footer><p class="text-muted text-small mb-0 font-weight-light">'+post.date+'</p></footer>';
        html += '</div></div></div>';  
    });
                
    }
    
    $("#allPost").html(html);
  }});     
}
    
$(document).ready(function(){
    getCategory();
    viewEvent();
    viewPost();
    viewJoinedEvent();

});