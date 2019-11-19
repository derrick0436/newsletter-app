$('document').ready(function()
{
    $('#loginForm').submit(function () {
     var uname = document.getElementById("uname").value;
     var pass = document.getElementById("pass").value;
     login("login","member",uname,pass);
     return false;
    });
    
    function login(action,role,uname,pass){
        $.ajax({
            url: '../../func/login.php',
            type: 'post',
            data: { action : action, role: role, uname : uname, pass : pass },
            success: function(response){
                var data = $.parseJSON(response);
                console.log(data.id);
                if(data.result == 1){
                    swal({
                      title: "Successfully Login!",
                      text: "Redirecting you to dashboard in 2 seconds.",
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
                        window.location.href = 'member/dashboard.html';
                      }
                    })
                }
                else{
                    console.log("Fail Login!");    
                    Swal.fire(
                      'Fail to Login!',
                      data.message,
                      'error'
                    )                         
                }
            }
        });
    }
});