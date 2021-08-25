function allow(params, msg, client){
    const newServerId = msg.guild.id;
    const newChannelId = msg.channel.id;
    const username = params[0];
    msg.reply("allowing " + username + "to access channel " + newChannelId.toString() + " of server " + newServerId.toString());
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