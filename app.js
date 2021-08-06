const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in...`);
});

client.on('message', msg => {
  if(msg.content.startsWith("!")){
      msg.reply("why tf you wake me up");
  }
});

client.login('ODczMTU2OTE3NDA3NjY2MTg2.YQ0Uvw.d4FTiklG5A3J1XN0HtY7uN-v0GA');