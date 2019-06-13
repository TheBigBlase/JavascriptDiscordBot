const Discord = require('discord.js');
const ping = require('../commands/ping.js');
const chalk = require('chalk');
const Enmap = require('enmap');
const settings = require('../settings.json');



module.exports = async (client,message) =>{
let nothing;
terminal = false;
if (message.author.bot) return;
ping.BigPing(message, client);
ping.BotPing(message, client);

    message.content = message.content.toLowerCase();
    args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const calledCommand = args.shift();

if (!message.content.startsWith(settings.prefix)) return;

if(!client.commands.get(calledCommand)) return;

client.commands.get(calledCommand).run(message, client, args, terminal);
}
