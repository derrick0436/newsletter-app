function checking(){
  $.ajax({url: "../func/checkSession.php", success: function(response){
    var data = $.parseJSON(response)
    console.log(data);
    if(data.result == 1 && data.role == "member")
    window.location.href = "http://ohcoolsy.com/pages/member/dashboard.html";
  }});
}

$(document).ready(function(){
  checking();
});