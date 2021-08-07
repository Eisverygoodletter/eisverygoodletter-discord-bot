const generateToken = function() {
    return Math.floor(1000000000000000 + Math.random() * 9000000000000000)
          .toString(36).substr(0, 10);
}

const verify = function(msg, myClient){
    console.log("verifying" + msg.author.username);
    var thisToken = generateToken();
    console.log(msg.author.username + " is associated with " + thisToken);
    msg.author.send("please go to this link: ");
    var address = "https://eisverygoodletter-discord-bot.herokuapp.com/verify/" + thisToken;
}

module.exports = {
    verify
}
