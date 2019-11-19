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
    $("#viewE_time").html(time);
    $("#viewE_venue").html(venue);    
    getEventPic(id);
}

function viewPostModal(id,title,content,username){
    $("#viewP_title").html(unescape(title));
    $("#viewP_content").html(unescape(content));
    $("#viewP_author").html("By " + username);
    getPostPic(id);
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
        html += '<div class="card" data-toggle="modal" data-target="#eventModal" onclick="viewEventModal('+event.id+',\''+escapeTitle+'\',\''+escapeContent+'\')">';
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
        html += '<div class="card" data-toggle="modal" data-target="#eventModal" onclick="viewEventModal('+event.id+',\''+escapeTitle+'\',\''+escapeContent+'\')">';
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
    

});