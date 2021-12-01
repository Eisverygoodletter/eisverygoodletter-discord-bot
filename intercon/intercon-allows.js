function allow(params, msg, client) {
    const newServerId = msg.guild.id;
    const newChannelId = msg.channel.id;
    const username = params[0];
    msg.reply("allowing user \"" + username + "\" to access channel " + newChannelId.toString() + " of server " + newServerId.toString());
    var addObj = { serverId: newServerId, channelId: newChannelId };
    // find user with this username
    var thisTokenData = global.tokenList.find((element) => element.username === username);
    if (thisTokenData == null) {
        msg.reply("token data object does not exist. resorting to direct database write");
        global.db.collection("users").doc(username).get().then(async(docSnapShot) => {
            // welcome to call back hell
            if (docSnapShot.exists == false) {
                msg.reply("bro wtf the user doesn't even exist");
            } else {
                var data = docSnapShot.data();
                if (data.allowedList.some((element) => element.serverId == newServerId && element.channelId == newChannelId)) {
                    // already exists
                    msg.reply("user " + username + " is already allowed in this channel :/ did you mean !unallow?");
                } else {
                    data.allowedList.push(addObj);
                    console.log(data);
                    // write the data
                    global.db.collection("users").doc(username).set(data);
                    msg.reply("done");
                }
            }
        });
    } else {
        msg.reply("token data object found. data will be written to database once client connection is closed");
        thisTokenData.addChannel(addObj);
        msg.reply("done")
    }
}

function unAllow(params, msg, client) {
    const oldServerId = msg.guild.id;
    const oldChannelId = msg.channel.id;
    const username = params[0];
    msg.reply("removing \"" + username + "\"`s permission to access this channel");
    var thisTokenData = global.tokenList.find((element) => element.username == username);
    if (thisTokenData == null) {
        // no user data (user not online rn);
        // don't worry about people trolling with this command because requires admin
        msg.reply("user not online directly writing to database");
        global.db.collection("users").doc(username).get().then(async(docSnapShot) => {
            if (docSnapShot.exists) {
                var data = docSnapShot.data();
                if (data.allowedList.some((element) => element.serverId == oldServerId && element.channelId == oldChannelId)) {
                    data.allowedList = data.allowedList.filter((element) => element.serverId != oldServerId || element.channelId != oldChannelId);
                    global.db.collection("users").doc(username).set(data);
                } else {
                    msg.reply("user " + username + " isn't even allowed in this channel :/ . Did you mean !allow ?");
                }
            } else {
                msg.reply("bro wtf the user doesn't even exist");
            }
            msg.reply("done");
        });
    }
}

module.exports = function(app, client) {
    var allowAdd = {
        commandName: "E intercon-allow",
        details: {
            callFunc: allow,
            requiredPerms: ["verified"],
            requireAllPermsListed: true,
            paramType: "infi-size",
            splittingUnit: ", ",
        }
    }
    var unAllowAdd = {
        commandName: "E intercon-unallow",
        details: {
            callFunc: unAllow,
            requiredPerms: ["Admin"],
            requireAllPermsListed: true,
            paramType: "infi-size",
            splittingUnit: ", ",
        }
    }
    var allAdds = [allowAdd, unAllowAdd];
    return allAdds;
}