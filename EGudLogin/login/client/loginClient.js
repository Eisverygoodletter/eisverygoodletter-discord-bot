baseURL = "https://eisverygoodletter-discord-bot.herokuapp.com/game/API/"

var accountCreationButton = document.getElementById("accountCreate");
accountCreationButton.onclick = function() {
    console.log("going to account creation page");
    location.href = location.href + "/createAccount";
}

var accountLoginButton = document.getElementById("accountLogin");
var usernameInput = document.getElementById("username");
var passwordInput = document.getElementById("password");
accountLoginButton.onclick = async function() {
    console.log("Logging in...")
    const username = usernameInput.value;
    const password = passwordInput.value;
    // no point in encoding, this is an HTTPS connection :)))
    if (username == "" || password == "") {
        console.log("username or password is wrong :(");
        return;
    }
    const sendObj = {
        username: username,
        password: password,
    };
    const res = await getPost("login-with-username", sendObj);
    console.log(res);
}