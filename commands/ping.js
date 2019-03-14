const Discord = require('discord.js');
const settings = require('../settings.json');
const chalk = require('chalk');

module.exports = {
    BigPing: async (message, client) => {
        if (message.isMemberMentioned(client.users.get(settings.BigID))) {
            if (message.author.id == settings.mods) {
                await message.channel.send("u dumbass");
            }
            else{
                console.log(chalk.blue(message.author.username) + ' pinged you');
                await message.react("🖕");
                await message.reply("Stop pinging that dumbass, he does not even deserve that much attention");
                await message.react(message.guild.emojis.get("504340162617016330"));
            }

        }
    },

    BotPing: async (message, client) => {
        if (message.isMemberMentioned(client.users.get(settings.BotID))) {
            await message.react(message.guild.emojis.get("504340162617016330"));
        }
    }
};
