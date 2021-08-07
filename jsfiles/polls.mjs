function poll(inputArray, msg){
    console.log("wow poll");
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
    commandList.push(pollAdd);
}