const charList = "🇦🇧🇨🇩🇪";

function poll(inputArray, msg){
    console.log("wow poll");
    // index 0 in inputArray is just the command, actual stuff starts from 1
    var channel = msg.channel;
    if(inputArray.length >= 5){
        channel.send("ERROR: Too many parameters");
    }
    var messageToSend = ""
    messageToSend += "vote!\n";
    for(let i = 1; i < inputArray.length; i++){
        // start from 1 bc 0 is the command
        var indic = charList[i - 1];
        var addIn = indic + ": " + inputArray[i] + "\n";
        messageToSend += addIn;
    }
    channel.send(messageToSend);
}


module.exports = function(){
    // called on init
    var pollAdd = {
        commandName:"!poll",
        details:{
            callFunc: poll,
            requiredPerms: ["verified"],
            requireAllPermsListed: true,
        }
    };
    var allAdds = [pollAdd]
    return allAdds;
}