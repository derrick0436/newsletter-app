$('document').ready(function()
{
    $('#registerForm').submit(function () {
        var stu_id = document.getElementById("stu_id").value;
        var uname = document.getElementById("uname").value;
        var pass = document.getElementById("pass").value;
        var email = document.getElementById("email").value;
        register("register",stu_id,uname,pass,email);
        return false;
    });
    
    function register(action,stu_id,uname,pass,email){
        $.ajax({
            url: '../../func/login.php',
            type: 'post',
            data: { action: action, stu_id: stu_id,uname: uname, pass: pass,email: email },
            success: function(response){
                var data = $.parseJSON(response);
                if(data.result == 1){
                    swal({
                      title: "Successfully Register!",
                      text: "Redirecting you to login page in 2 seconds.Wait for the approval!",
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
                        window.location.href = 'login.html';
                      }
                    })
                }
                else{
                    console.log("Fail Register!");    
                    Swal.fire(
                      'Fail to Register!',
                      data.message,
                      'error'
                    )                         
                }
            },
            error: function(data){
                console.log("Fail Register!");    
                Swal.fire(
                    'Fail to Register!',
                    'Please contact your admin!',
                    'error'
                )   
            }            
        });
    }
});