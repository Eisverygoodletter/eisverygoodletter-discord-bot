const Discord = require('discord.js');
const client = new Discord.Client();
const http = require("http");
client.on('ready', () => {
  console.log(`Logged in...`);
});

client.on('message', msg => {
  if(msg.content.startsWith("!")){
      msg.reply("why tf you wake me up");
  }
});

client.login('ODczMTU2OTE3NDA3NjY2MTg2.YQ0Uvw.d4FTiklG5A3J1XN0HtY7uN-v0GA');

http.createServer(function(request, response){
    console.log(request,response);

}).listen(process.env.PORT || 5000);