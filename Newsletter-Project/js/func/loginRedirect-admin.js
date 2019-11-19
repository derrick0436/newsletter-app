function checking(){
  $.ajax({url: "../../func/checkSession.php", success: function(response){
    var data = $.parseJSON(response)
    console.log(data);
    if(data.result == 1 && data.role == "admin")
    window.location.href = "http://ohcoolsy.com/pages/admin/dashboard.html";
  }});
}

$(document).ready(function(){
  checking();
});