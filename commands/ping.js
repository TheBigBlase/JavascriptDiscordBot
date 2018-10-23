const Discord = require('discord.js');
const settings = require('../settings.json');

module.exports = {

    BigPing: async (message, client) => {
        if (message.isMemberMentioned(client.users.get(settings.BigID))) {
            if (message.author.id === settings.BigID) {
                await message.channel.send("Master, are you as dumb as forgotten ?");
            }
            else{
                console.log(message.author.username + ' pinged you');
                await message.react("🖕");
                await message.reply("Stop pinging my lord, u dumb");
                await message.react(message.guild.emojis.get("504340162617016330"));
            }

        }
    },

    Spam: async (message, args) => {
        console.log("Spam is triggered ");
        if (message.author.id === settings.BigID) {
            let target = args[0];
            let times = parseInt(args[1]);
            for (let k = 0; k<times; k++) {
                await message.channel.send(`${target}, Are you happy now ? `);
            }
            console.log("Spam ended ");
        }
        else {
            message.channel.send("Ask for admin role, fam");
        }
    },

    BotPing: async (message, client) => {
        if (message.isMemberMentioned(client.users.get(settings.BotID))) {
            await message.react(message.guild.emojis.get("504340162617016330"));
        }
    }
};    