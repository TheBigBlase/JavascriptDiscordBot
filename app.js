const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json'); 
let sleep = require('system-sleep');

let botID = "466528328061419521";
let adminID = "313306342985039875"; 
let generalID = "466527924535951372";


client.on('ready', () => {
    console.log('I\'m Online !');
    client.channels.get(generalID).send('I\'m online ! ');
});

client.on('message', message => {
    if (message.author.bot) return;
    if (message.isMemberMentioned(client.users.get(adminID))) {
        console.log(message.author.username + ' pinged you');
        message.reply("Stop pinging my lord, u dumb");
    }

    if (message.author.id == adminID && message.content === "fuckoff") {
        sleep(100);
        message.channel.send("Bye ! ");
        sleep(100);
        console.log('disconnecting...');
        client.destroy();
        console.log('Disconnected');
        process.exit();
        }
});

client.login(settings.token);