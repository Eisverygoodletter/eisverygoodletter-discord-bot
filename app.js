const Discord = require('discord.js');
const client = new Discord.Client();
const http = require("http");
const verifyJS = require("./jsfiles/verify");
const express = require("express");
var app = express();

var currentVerifying = []

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
      currentVerifying.push(linkId);
    }
  }
  else if(msg.channel.name == process.env.BOT_COMMANDS_CHANNEL){
    
  }
});

client.login('ODczMTU2OTE3NDA3NjY2MTg2.YQ0Uvw.d4FTiklG5A3J1XN0HtY7uN-v0GA');



var server = app.listen(process.env.PORT || 5000);