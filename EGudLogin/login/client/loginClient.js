var accountCreationButton = document.getElementById("accountCreate");
accountCreationButton.onclick = function(){
    console.log("going to account creation page");
    location.href = location.href + "/createAccount";
}

var accountLoginButton = document.getElementById("accountLogin");
var usernameInput = document.getElementById("username");
var passwordInput = document.getElementById("password");
accountLoginButton.onclick = function(){
    console.log("Logging in...")
    const username = usernameInput.value;
    const password = passwordInput.value;
    const hashingSalt = bcrypt.genSaltSync(5);
    const hashedPassword = bcrypt.hashSync(password, hashingSalt);
    console.log(username, hashedPassword);
}