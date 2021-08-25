function allow(params, msg, client){
    const newServerId = msg.guild.id;
    const newChannelId = msg.channel.id;
    const username = params[0];
    msg.reply("allowing user \"" + username + "\" to access channel " + newChannelId.toString() + " of server " + newServerId.toString());
    var addObj = {serverId: newServerId, channelId: newChannelId};
    // find user with this username
    var thisTokenData = global.tokenList.find((element)=> element.username === username);
    if(thisTokenData == null){
        msg.reply("token data object does not exist. resorting to direct database write");
        global.db.collection("users").doc(username).get().then(async (docSnapShot)=>{
            // welcome to call back hell
            if(docSnapShot.exists == false){
                msg.reply("bro wtf the user doesn't even exist");
            }
            else{
                var data = docSnapShot.data();
                if(data.allowedList.some((element)=>element.serverId == newServerId && element.channelId == newChannelId)){
                    // already exists
                    msg.reply("user " + username + " is already allowed in this channel :/ did you mean !unallow?");
                }
                else{
                    data.allowedList.push(addObj);
                    console.log(data);
                    // write the data
                    global.db.collection("users").doc(username).set(data);
                    msg.reply("done");
                }
            }
        });
    }
    else{
        msg.reply("token data object found. data will be written to database once client connection is closed");
        thisTokenData.addChannel(addObj);
        msg.reply("done")
    }
}


module.exports = function(app, client){
    var allowAdd = {
        commandName: "!intercon-allow",
        details:{
            callFunc: allow,
            requiredPerms: ["verified"],
            requireAllPermsListed: true,
            paramType: "infi-size",
            splittingUnit: ", ",
        }
    }
    var allAdds = [allowAdd];
    return allAdds;
}