const Discord = require('discord.js');
const settings = require('../settings.json');

module.exports = {
    Shutdown: async (message, client) => {
        console.log('Fuckoff trigger');
            if (settings.mods.includes(message.author.id)) {
                await message.channel.send("Bye ! ");
                console.log('disconnecting...');
                await client.destroy();
                console.log('Disconnected');
                await process.exit();
            }
            else {
                await message.channel.send("ask for an admin role fam");
                console.log(message.author.username + 'tried to shut me down');
            }
        }
}
