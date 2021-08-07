

const verify = function(msg, myClient){
    console.log("verifying" + msg.author.username);
    var thisToken = msg.author.Discriminator;
    msg.author.send("please go to this link: ");
    var address = "https://eisverygoodletter-discord-bot.herokuapp.com/verify/" + msg.author.username + thisToken;
    msg.author.send(address);
    return ["verify/" + msg.author.username + thisToken, msg.author.id];
}

module.exports = {
    verify
}
