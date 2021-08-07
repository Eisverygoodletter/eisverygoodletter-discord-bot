const Discord = require('discord.js');
const client = new Discord.Client();
const http = require("http");
const verifyJS = require("./jsfiles/verify.js");
const express = require("express");
var app = express();

var currentVerifying = []
var commandList = []; // in the format of {commandName:___, details:{}}

client.on('ready', () => {
  console.log(`Logged in...`);
});

client.on('message', msg => {
  if(msg.channel.name == process.env.VERIFY_CHANNEL){
    if(msg.content = "!verify"){
      
      var linkId = verifyJS.verify(msg, client);
      app.get(linkId.link, function(req,res){
        res.sendFile("./jsfiles/verify.html", {root: __dirname});
      });
      app.post(linkId.link, function(req, res){
        console.log("we dun");
        var verifiedRole = linkId.msg.member.guild.roles.cache.find(role => role.name === "verified");
        linkId.msg.member.roles.add(verifiedRole);
        client.channels.cache.get(process.env.GENERAL_CHANNEL_KEY).send(linkId.msg.author.username + " just got verified! welcome!");
      });
      currentVerifying.push(linkId);
    }
  }
  else{
    var command = msg.content.split(" ")[0]; //first word
    for(var i = 0; i < commandList.length; i++){
      if(command == commandList[i].commandName){
        // check if person has role
        var hasPerms = [];
        for(var j = 0; j < commandList[i].details.requiredPerms.length; j++){
          if(msg.member.roles.cache.some(role => role.name === commandList[i].details.requiredPerms[i])){
            hasPerms.push(true);
          }
          else{
            hasPerms.push(false);
          }
        }
        var canCommand = false;
        if(commandList[i].details.requireAllPermsListed == true){
          // all bools in hasPerms must be true
          canCommand = hasPerms.every((e)=>{
            return e == true;
          });
        }
        else{
          // just need 1 perm
          canCommand = hasPerms.some((e)=>{
            return e == true;
          });
        }
        if(canCommand){
          commandList[i].details.callFunc(msg.content.split(" "),msg);
        }
        break; // no other commands will match
      }
    }
  }
});

client.login(process.env.BOT_TOKEN);



var server = app.listen(process.env.PORT || 5000);


/*
  ADD COMMANDS UNDERNEATH

*/

function loadCommands(){
  // require(jsfiles/yourFile.js)();
  require("./jsfiles/polls.js")();
}