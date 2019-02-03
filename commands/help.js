const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    Help: async (message) => {
        console.log("Help is triggered");
        var help = fs.readFileSync("./commands/help.txt", { encoding: 'utf-8', flag: 'r' });
        await message.channel.send(help);
        console.log('help ended');
    }
};
