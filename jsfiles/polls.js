const charList = "🇦🇧🇨🇩🇪🇫";

function poll(params, msg, client){
    console.log("polling " + params.join());
    // params 0 is the question
    var messageText = "";
    var question = params[0];
    messageText += question + "\n";
    messageText += "vote!\n";
    for(let i = 1; i < params.length; i++){
        // starting from index 1, create question for each
        var addIn = ":regional_indicator_" + String.fromCharCode(i + 96) + "::" //97 starts with the actual unicode stuff
        addIn += params[i];
        addIn += "\n";
        messageText += addIn;
    }
    msg.channel.send(messageText).then((newMsg)=>{
        // add reactions
    })
}


module.exports = function(){
    // called on init
    var pollAdd = {
        commandName:"!poll",
        details:{
            callFunc: poll,
            requiredPerms: ["verified"],
            requireAllPermsListed: true,
            paramType: "infi-size",
            splittingUnit: ", ",
        }
    };
    var allAdds = [pollAdd]
    return allAdds;
}