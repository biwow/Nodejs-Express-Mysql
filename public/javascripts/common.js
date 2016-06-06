$(document).ready(function () {
    var login_error=$.cookie('login_error');
    if(login_error=== undefined || login_error<1){
        $("#login_error").alert('close');
    }
});