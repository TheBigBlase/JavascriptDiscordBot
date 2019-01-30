const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const command = require('./commands/command.js');
const ping = require('./commands/ping.js');


client.on('ready', () => {
    console.log('I\'m Online ! \nI\'m online ! ');
    client.channels.get(settings.DevPlaceID).send('I\'m online !');

});



client.on('message', async message => {
    if (message.author.bot) return;
    ping.BigPing(message, client);
    ping.BotPing(message, client);
    message.content = message.content.toLowerCase();
    if (!message.content.startsWith(settings.prefix)) return;

    command.CheckCommand(message, client);
});

client.login(settings.token);
