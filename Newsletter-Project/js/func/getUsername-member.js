function checking(){
  $.ajax({url: "../../func/checkSession.php", success: function(response){
    var data = $.parseJSON(response)
    console.log(data);
    if(data.result == 1 && data.role == "member")
    $(".name").text(data.username);
    else
    window.location.href = "http://ohcoolsy.com/pages/login.html";
  }});
}

$(document).ready(function(){
  checking();
});