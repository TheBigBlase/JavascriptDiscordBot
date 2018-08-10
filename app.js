const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const command = require('./commands/command.js');
const ping = require('./commands/ping.js')


client.on('ready', () => {
    console.log('I\'m Online ! \nI\'m online ! ');
    client.channels.get(settings.generalID).send('I\'m online !');
});



client.on('message', async message => {
    if (message.author.bot) return;
    ping.Ping(message, client);
   // if (message.content.startsWith(settings.prefix)){ //for Forgotten 
        command.CheckCommand(message, client);
   // }
});



client.login(settings.token);
