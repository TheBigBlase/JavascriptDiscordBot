const Discord = require('discord.js');
const settings = require('../settings.json');
module.exports = {
    Ping: async (message, client) => {
        if (message.isMemberMentioned(client.users.get(settings.BigID))) {
            console.log(message.author.username + ' pinged you');
            return message.reply("Stop pinging my lord, u dumb");
        }
    }
}   