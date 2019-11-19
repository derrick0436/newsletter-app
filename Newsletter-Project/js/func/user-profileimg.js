function getUserPP(){
    $.ajax({
        url: '../../func/viewProfilePic.php',
        success: function(response){
            var data = $.parseJSON(response);
            if(data.result == 1){
                var pic = "";
                if(data.data != ""){
                    $("#user-ppimg").attr("src",'data:image/png;base64,'+data.data);
                }
            }
        }
    });    
}

$(document).ready(function(){
    getUserPP();
});