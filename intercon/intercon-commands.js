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
    }
    else{
        thisTokenData.addChannel(addObj);
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