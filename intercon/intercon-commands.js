function allow(params, msg, client){
    const newServerId = msg.guild.id;
    const newChannelId = msg.channel.id;
    const username = params[0];
    console.log("allowing " + username + "in server " + newServerId.toString() + ", channel " + newChannelId.toString());
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