const Discord = require('discord.js');
const settings = require('../settings.json');

module.exports = {
    Shutdown: async (message, client) => {
        if (message.content === "fuckoff") {
            if (message.author.id == settings.BigID) {
                await message.channel.send("Bye ! ");
                console.log('disconnecting...');
                await client.destroy();
                console.log('Disconnected');
                process.exit();
            }
            else {
                message.channel.send("ask for an admin role fag");
            }
        }
    }
}