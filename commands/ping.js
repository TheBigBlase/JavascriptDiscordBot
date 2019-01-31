const Discord = require('discord.js');
const settings = require('../settings.json');

module.exports = {

    BigPing: async (message, client) => {
        if (message.isMemberMentioned(client.users.get(settings.BigID))) {
            if (message.author.id == settings.mods) {
                await message.channel.send("u dumbass");
            }
            else{
                console.log(message.author.username + ' pinged you');
                await message.react("🖕");
                await message.reply("Stop pinging that dumbass, he does not even deserve that much attention");
                await message.react(message.guild.emojis.get("504340162617016330"));
            }

        }
    },

    Spam: async (message, args) => {
        console.log("Spam is triggered ");
        if (settings.mods.includes(message.author.id) && !message.author.id==settings.ForgottenID) {
            let target = args[0];
            let times = parseInt(args[1]);
            for (let k = 0; k<times; k++) {
                await message.channel.send(`${target}, Are you happy now ? `);
            }
            console.log("Spam ended ");
        }
        else if(!settings.mods.includes(message.author.id)){
            message.channel.send("Ask for admin role, fam");
            console.log("Non admin spam");
        }
        else{
          message.channel.send("Fuckoff forgoten");
          console.log("Forgotten tried to spam");
        }
    },

    BotPing: async (message, client) => {
        if (message.isMemberMentioned(client.users.get(settings.BotID))) {
            await message.react(message.guild.emojis.get("504340162617016330"));
        }
    }
};
