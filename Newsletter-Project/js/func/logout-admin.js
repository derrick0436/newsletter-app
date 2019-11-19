$('document').ready(function()
{
    $('#logoutBtn').click(function () {
     logout("logout");
    });
    
    function logout(action){
        $.ajax({
            url: '../../func/login.php',
            type: 'post',
            data: { action : action},
            success: function(response){
                var data = $.parseJSON(response);
                console.log(data.id);
                if(data.result == 1){
                    swal({
                      title: "Successfully Logout!",
                      text: "Redirecting you back to login page in 2 seconds.",
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
            }
        });
    }
});