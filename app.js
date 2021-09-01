const Discord = require('discord.js');
global.Discord = Discord;
const client = new Discord.Client();
global.clie = client;
const http = require("http");
global.http = http;
const fs = require("fs");
global.fs = fs;
const verifyJS = require("./jsfiles/verify.js");
global.verifyJS = verifyJS;
const express = require("express");
global.express = express;
const path = require("path");
global.path = path;
var app = express();
global.app = app;
const downloadImageJS = require("./imageLoader/downloadImage.js");
global.downloadImageJS = downloadImageJS;
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

var server = app.listen(process.env.PORT || 5000);


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
          if(msg.member.roles.cache.some(role => role.name === commandList[i].details.requiredPerms[j])){
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
          var params = null;
          if(commandList[i].details.paramType === "infi-size"){
            params = msg.content.substr(msg.content.indexOf(" ") + 1);
            // params now does not have the poll
            params = params.split(commandList[i].details.splittingUnit);
          }
          commandList[i].details.callFunc(params, msg, client);
        }
        break; // no other commands will match
      }
    }
  }
});

client.login(process.env.BOT_TOKEN);






/*
  ADD COMMANDS UNDERNEATH

*/

function loadCommands(){
  commandList = commandList.concat(require("./jsfiles/polls.js")());
  commandList.concat(require("./intercon/intercon.js")(app, client));
  commandList = commandList.concat(require("./intercon/intercon-allows.js")());
}
loadCommands();

