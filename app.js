const Discord = require('discord.js');
const client = new Discord.Client();
const http = require("http");
const verifyJS = require("./jsfiles/verify");
client.on('ready', () => {
  console.log(`Logged in...`);
});

client.on('message', msg => {
  if(msg.channel.toString() == "!verify"){
    if(msg.content = "!verify"){
      verifyJS.verify(msg, client);
    }
  }
  else if(msg.channel.toString() == "bot-commands"){
    
  }
});

client.login('ODczMTU2OTE3NDA3NjY2MTg2.YQ0Uvw.d4FTiklG5A3J1XN0HtY7uN-v0GA');

http.createServer(function(request, response){
    console.log(request,response);

}).listen(process.env.PORT || 5000);