function getInvitation(){
  $.ajax({url: "../../func/viewInvitation.php",    
    beforeSend: function() {
        $(".allInvitation").html('<div class="loader"></div>');
    }, success: function(response){
    var data = $.parseJSON(response)
    console.log(data);
    if(data.result == 1 && data.role == "member"){
        var html = "";
        if(data.data.length == 0)
        html +='<span class="badge badge-pill badge-danger">No Invitation</span>';             
        else{
        $(data.data).each(function (index, inv) {
            var array_time = inv.event_time.split(":");
            var time = array_time[0] + ":" + array_time[1];
            
            var text = inv.title + "'s event will be start on (" + inv.event_date + ") at " + time + ", " + inv.event_venue;
            var invitation_id = inv.event_id+"invitation";
            
            html += '<div class="card d-flex flex-row mb-3 col-12" id="'+invitation_id+'">';
            html += '<div class="d-flex flex-grow-1 min-width-zero">';
            html += '<div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">';
            html += '<a class="list-item-heading mb-1 truncate w-40 w-xs-100" href="#" style="white-space:normal;">'
            html += text
            html += '</a>';
            html += '<p class="mb-1 text-black text-small w-15 w-xs-100">' + "By " +inv.fromUser + '</p>';
            html += '<p class="mb-1 text-black text-small w-15 w-xs-100">' + inv.date + '</p>';
            html += '<div class="w-15 w-xs-100">'
            html += '<span class="badge badge-pill badge-secondary">Invitation</span>';
            html += '</div>';
            html += '</div>';
            html += '<div class="custom-control mb-0 align-self-center mr-4" style="display:inline-grid;">';
            html += '<button type="button" class="btn btn-outline-warning mt-2 mb-2" onclick="acceptInvitation('+inv.userId+','+inv.toUser+','+inv.event_id+',\'#'+invitation_id+'\');">Accept</button>';
            html += '<button type="button" class="btn btn-outline-danger mb-2" onclick="declineInvitation('+inv.userId+','+inv.toUser+','+inv.event_id+',\'#'+invitation_id+'\');">Decline</button>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
        });
        }
        
        $(".allInvitation").html(html);
    }
  }});
}

function getShare(){
  $.ajax({url: "../../func/viewShare.php",    
    beforeSend: function() {
        $(".allShare").html('<div class="loader"></div>');
    }, success: function(response){
    var data = $.parseJSON(response)
    console.log(data);
    if(data.result == 1 && data.role == "member"){
        var html = "";
        if(data.data.length == 0)
        html +='<span class="badge badge-pill badge-danger">No Share Post</span>';             
        else{
        $(data.data).each(function (index, shr) {
            
            html += '<div class="card d-flex flex-row mb-3 col-12" >';
            html += '<div class="d-flex flex-grow-1 min-width-zero">';
            html += '<div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">';
            html += '<p class="list-item-heading mb-1 truncate w-40 w-xs-100" href="#" style="white-space:nowrap;">'
            html += shr.content
            html += '</p>';
            html += '<p class="mb-1 text-black text-small w-15 w-xs-100">' + "By " +shr.username + '</p>';
            html += '<div class="w-15 w-xs-100">'
            html += '<span class="badge badge-pill badge-success">Share</span>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
        });
        }
        
        $(".allShare").html(html);
    }
  }});
}

function acceptInvitation(from,to,event,id){
$.ajax({
		url: '../../func/acceptInvitation.php',
		data: {fromUser: from ,toUser: to,event_id: event},
		type: 'post',
		success: function (response) {
			console.log(response);
			var data = $.parseJSON(response);
			if(data.result == 1){
		        $(id).remove();
			}
			
		},
		error: function (response) {
			console.log(response);
		}
	});    
}

function declineInvitation(from,to,event,id){
$.ajax({
		url: '../../func/declineInvitation.php',
		data: {fromUser: from ,toUser: to,event_id: event},
		type: 'post',
		success: function (response) {
			console.log(response);
			var data = $.parseJSON(response);
			if(data.result == 1){
		        $(id).remove();
			}
			
		},
		error: function (response) {
			console.log(response);
		}
	});    
}


$(document).ready(function(){
    getInvitation();
    getShare();
});