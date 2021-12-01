const verify = function(msg, myClient) {
    console.log("verifying" + msg.author.username);
    var thisToken = "shittyTemporaryReplacementLink";
    msg.author.send("please go to this link: ");
    var address = "https://eisverygoodletter-discord-bot.herokuapp.com/verify/" + thisToken;
    msg.author.send(address);
    var linkId = {
        link: "/verify/" + thisToken,
        identification: thisToken,
        msg: msg
    }
    return linkId
}

module.exports = {
    verify
}