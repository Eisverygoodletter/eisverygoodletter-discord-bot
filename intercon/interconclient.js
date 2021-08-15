// jquery allowed in here
const baseURL = "https://eisverygoodletter-discord-bot.herokuapp.com";
var username = null;
var ID = null;

$(document).ready(function(){
    // put all code in here
    $("#loginModal").modal("show");
    $("#login").click(function(){
        if($("#modalUsernameInput").val() == ""){
            alert("error: you need to put in a username");
        }
        else if($("#modalPasswordInput").val() == ""){
            alert("error: you need to put in a password");
        }
        else{
            // close BOX
            $("#loginModal").modal("hide");
            username = $("#modalUsernameInput").val();
            const password = $("#modalPasswordInput").val(); //hashing will be done on serverside
            // code put here is exposed to the public and the hashing algorithm / salt will be known
            // a basic encryption will be added so that hackers can't just wireshark with no effort
            let today = new Date().toLocaleDateString();
            const encPassword = CryptoJS.AES.encrypt(password, today).toString(); // encryption using today's date
            if($("#modalNewInput").is(":checked")){
                // create a new account
                console.log("requesting for creating a new account");
                var createRequest = new XMLHttpRequest();
                createRequest.open("GET", baseURL + "/INTERCON/CREATE_ACC?userName=" + username + "&passWord=" + encPassword);

                createRequest.send();
            }
            else{
                // login to the old account
                console.log("requesting for log in...");
                var loginRequest = new XMLHttpRequest();
                loginRequest.open("GET", baseURL + "/INTERCON/LOGIN?userName=" + username + "&passWord=" + encPassword);
                loginRequest.send();
            }
            // clean this function off
            $("#login").onclick = null;
            //$("#loginModal").modal("hide"); // destruction of the modal
        }
    });
})