var accountCreationButton = document.getElementById("accountCreate");
accountCreationButton.onsubmit = function(){
    console.log("going to account creation page");
    window.location.href = location.href + "/createAccount";
}
