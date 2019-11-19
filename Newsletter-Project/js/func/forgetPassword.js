$('document').ready(function()
{
    $('#forgetPasswordForm').submit(function () {
     var email = document.getElementById("email").value;
     forgetPassword(email);
     return false;
    });
    
    function forgetPassword(email){
        $.ajax({
            url: '../../func/forgetPassword.php',
            type: 'post',
            data: {email :email},
            success: function(response){
                var data = $.parseJSON(response);
                console.log(data.id);
                if(data.result == 1){
                    swal({
                      title: "New Password Sent to Your Email!",
                      text: "Redirecting you to login page in 2 seconds.",
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
                        window.location.href = 'http://ohcoolsy.com/pages/login.html';
                      }
                    })
                }
                else{
                    console.log("Fail Sent Email!");    
                    Swal.fire(
                      'Fail to Sent Email!',
                      data.message,
                      'error'
                    )                         
                }
            }
        });
    }
});