global.dumbMarkJS = {}
global.dumbMarkJS.markedIds = [];

function markUser(params, msg, client) {
    let members = msg.mentions.users;
    members = Array.prototype.slice.call(members, 0);
    console.log(members);
    let channel = msg.channel;
    channel.send("marking");
    for (let user of members) {
        console.log(user.username);
        if (!(user.id in global.dumbMarkJS.markedIds)) {
            global.dumbMarkJS.markedIds.push(user.id);
        } else
            channel.send("one of these users are already on the dum list");
    }
}

function unMarkUser(params, msg, client) {
    let mentionedUser = msg.mentions;
    let members = msg.members;
    let channel = msg.channel;
    let removalList = [];
    channel.send("unmarking");
    for (let user of members) {
        console.log("removing");
        console.log(user.id);
        if (user.id in global.dumbMarkJS.markedIds) {
            removalList.push(user.id);
        } else
            channel.send("this user isn't in the dum list ????");
    }
    global.dumbMarkJS.markedIds = global.dumbMarkJS.markedIds.filter((a) => !(a in removalList));
}

module.exports = function(app, client) {
    let mark = {
        commandName: "E_dumark",
        details: {
            callFunc: markUser,
            requiredPerms: [],
            requireAllPermsListed: true,
            paramType: "infi-size",
            splittingUnit: ", ",
        }
    }
    let unmark = {
        commandName: "E_undumark",
        details: {
            callFunc: unMarkUser,
            requiredPerms: [],
            requireAllPermsListed: true,
            paramType: "infi-size",
            splittingUnit: ", ",
        }
    }
    return [mark, unmark];
}

function dumbMarkMiddleware(msg, client) {
    if (msg.author.id in global.dumbMarkJS.markedIds) {
        msg.channel.send("REEEEEEEEEEEEE am broken bot pls fix pls pls pls pls");
    }
    return msg;
}
global.middleware.push(dumbMarkMiddleware);