const charList = "🇦🇧🇨🇩🇪";

function poll(inputArray, msg){
    console.log("wow poll");
    // index 0 in inputArray is just the command, actual stuff starts from 1
    var channel = msg.channel;
    var messageToSend = ""
    messageToSend += inputArray[1] + "\n";
    messageToSend += "vote!\n";
    var ansText = inputArray.slice(2).join();
    var ansArray = ansText.split(",");
    for(let i = 0; i < ansArray.length; i++){
        // start from 1 bc 0 is the command
        var indic = ":regional_indicator_" + String.fromCharCode(i + 97); // 97 starts with a
        var addIn = indic + ": " + ansArray[i] + "\n";
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