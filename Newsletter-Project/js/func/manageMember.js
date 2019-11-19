function getViewApprovedMember(){
  $.ajax({url: "../../func/viewApprovedMember.php",    
    beforeSend: function() {
        $(".approvedMember").html('<div class="loader"></div>');
    }, success: function(response){
    var data = $.parseJSON(response)
    console.log(data);
    if(data.result == 1 && data.role == "admin"){
        var html = "";
        if(data.data.length == 0)
        html +='<span class="badge badge-pill badge-danger">No Approved Members</span>';             
        else{
        $(data.data).each(function (index, member) {
            html += '<div class="card d-flex flex-row mb-3">'; 
            html += '<div class="d-flex flex-grow-1 min-width-zero">';
            html += '<div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">';
            html += '<a class="list-item-heading mb-1 text-white truncate w-40 w-xs-20" href="#" data-toggle="modal" data-backdrop="static" data-target="#viewMemberModal" onclick="viewMemberModal(0,\''+member.stu_id+'\',\''+member.username+'\',\''+member.email+'\');">';
            html += member.stu_id;
            html += " | ";
            html += member.username;
            html += '</a>';
            html += '<div class="w-15 w-xs-100"><span class="badge badge-pill badge-success">Approved</span></div>';
            html += '</div>';   
            html += '<div class="custom-control mb-0 align-self-center mr-4" style="display:inline-grid;">';
            html += '<button type="button" class="btn btn-outline-danger mt-2 mb-2" onclick="deleteMember('+member.id+');">Delete</button>';
            html += '<button type="button" class="btn btn-outline-danger mt-2 mb-2" onclick="blockMember('+member.id+');">Block</button></div>';
            html += '</div></div></div>';
        });
        }
                    
        
        $(".approvedMember").html(html);
    }
  }});
}

function getViewDisapprovedMember(){
  $.ajax({url: "../../func/viewDisapprovedMember.php",    
    beforeSend: function() {
        $(".disapprovedMember").html('<div class="loader"></div>');
    }, success: function(response){
    var data = $.parseJSON(response)
    console.log(data);
    if(data.result == 1 && data.role == "admin"){
        var html = "";
        if(data.data.length == 0)
        html +='<span class="badge badge-pill badge-danger">No Disapproved Members</span>';        
        else{
        $(data.data).each(function (index, member) {
            html += '<div class="card d-flex flex-row mb-3">'; 
            html += '<div class="d-flex flex-grow-1 min-width-zero">';
            html += '<div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">';
            html += '<a class="list-item-heading mb-1 text-white truncate w-40 w-xs-20" href="#" data-toggle="modal" data-backdrop="static" data-target="#viewMemberModal" onclick="viewMemberModal(1,\''+member.stu_id+'\',\''+member.username+'\',\''+member.email+'\');">';
            html += member.stu_id;
            html += " | ";
            html += member.username;
            html += '</a>';
            html += '<div class="w-15 w-xs-100"><span class="badge badge-pill badge-warning">Waiting for approval</span></div>';
            html += '</div>';   
            
            html += '<div class="custom-control mb-0 align-self-center mr-4" style="display:inline-grid;">';
            html += '<button type="button" class="btn btn-outline-success mt-2 mb-2" onclick="approveMember('+member.id+');">Approve</button>';
            html += '<button type="button" class="btn btn-outline-danger mb-2" onclick="disapproveMember('+member.id+');">Decline</button>';
            html += '</div>';
            html += '</div></div></div>';
        });
        }
        
        $(".disapprovedMember").html(html);
    }
  }});
}

function getViewBlockedMember(){
  $.ajax({url: "../../func/viewBlockedMember.php",    
    beforeSend: function() {
        $(".blockedMember").html('<div class="loader"></div>');
    }, success: function(response){
    var data = $.parseJSON(response)
    console.log(data);
    if(data.result == 1 && data.role == "admin"){
        var html = "";
        if(data.data.length == 0)
        html +='<span class="badge badge-pill badge-danger">No Blocked Members</span>';
        else{
        $(data.data).each(function (index, member) {
            html += '<div class="card d-flex flex-row mb-3">'; 
            html += '<div class="d-flex flex-grow-1 min-width-zero">';
            html += '<div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">';
            html += '<a class="list-item-heading mb-1 text-white truncate w-40 w-xs-20" href="#" data-toggle="modal" data-backdrop="static" data-target="#viewMemberModal" onclick="viewMemberModal(1,\''+member.stu_id+'\',\''+member.username+'\',\''+member.email+'\');">';
            html += member.stu_id;
            html += " | ";
            html += member.username;
            html += '</a>';
            html += '<div class="w-15 w-xs-100"><span class="badge badge-pill badge-danger">Blocked</span></div>';
            html += '</div>';   
            html += '<div class="custom-control mb-0 align-self-center mr-4" style="display:inline-grid;">';
            html += '<button type="button" class="btn btn-outline-danger mt-2 mb-2" onclick="deleteMember('+member.id+');">Delete</button>';
            html += '<button type="button" class="btn btn-outline-danger mt-2 mb-2" onclick="unblockMember('+member.id+');">Unblock</button></div>';
            html += '</div>';
            html += '</div></div></div>';
        });
                    
        }
        
        $(".blockedMember").html(html);
    }
  }});
}

function approveMember(id){
    $.ajax({
        url: '../../func/approveMember.php',
        type: 'post',
        data: { id : id},
        success: function(response){
            var data = $.parseJSON(response);
            console.log(data);
            if(data.result == 1){
                getViewApprovedMember();
                getViewDisapprovedMember();
            }
        }
    });    
}

function disapproveMember(id){
    $.ajax({
        url: '../../func/disapproveMember.php',
        type: 'post',
        data: { id : id},
        success: function(response){
            var data = $.parseJSON(response);
            console.log(data);
            if(data.result == 1){
                getViewDisapprovedMember();
            }
        }
    });    
}

function blockMember(id){
    $.ajax({
        url: '../../func/blockMember.php',
        type: 'post',
        data: { id : id},
        success: function(response){
            var data = $.parseJSON(response);
            console.log(data);
            if(data.result == 1){
              getViewApprovedMember();
              getViewDisapprovedMember();
              getViewBlockedMember();
            }
        }
    });    
}

function unblockMember(id){
    $.ajax({
        url: '../../func/unblockMember.php',
        type: 'post',
        data: { id : id},
        success: function(response){
            var data = $.parseJSON(response);
            console.log(data);
            if(data.result == 1){
              getViewApprovedMember();
              getViewDisapprovedMember();
              getViewBlockedMember();
            }
        }
    });    
}

function deleteMember(id){
    $.ajax({
        url: '../../func/deleteMember.php',
        type: 'post',
        data: { id : id},
        success: function(response){
            var data = $.parseJSON(response);
            console.log(data);
            if(data.result == 1){
              getViewApprovedMember();
              getViewDisapprovedMember();
              getViewBlockedMember();
            }
        }
    });    
}

function viewMemberModal(approve,stu_id,username,email){
    $("#viewM_title").html(stu_id + " | " + username);
    $("#viewM_stu_id").html("Student ID: " + stu_id);
    $("#viewM_username").html("Username: " + username);
    $("#viewM_email").html("Email: " + email);
}

$(document).ready(function(){
  getViewApprovedMember();
  getViewDisapprovedMember();
  getViewBlockedMember();
});