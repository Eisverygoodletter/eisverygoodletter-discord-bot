// jquery allowed in here

$(document).ready(function(){
    // put all code in here
    $("#loginModal").modal("show");
    $("#login").onclick = function(){
        if($("#modalUsernameInput").val() == ""){
            alert("error: you need to put in a username");
        }
        else if($("#modalPasswordInput").val() == ""){
            alert("error: you need to put in a password");
        }
        else{
            if($("#modalNewInput").val() == true){
                // create a new account
                console.log("requesting for creating a new account");
            }
            else{
                // login to the old account
                console.log("requesting for log in...");
            }
            // clean this function off
            $("#login").onclick = null;
        }
    }
})