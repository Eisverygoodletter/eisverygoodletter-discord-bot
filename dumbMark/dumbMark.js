global.dumbMarkJS = {}
global.dumbMarkJS.markedIds = [];

function getUserFromMention(mention) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return client.users.cache.get(mention);
    }
}

function markUser(params, msg, client) {
    let members = msg.mentions;
    let userToBeMarked = getUserFromMention(members);
    msg.channel.send(`marking ${userToBeMarked.username}`);
    global.dumbMarkJS.markedIds.push(userToBeMarked.id);
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