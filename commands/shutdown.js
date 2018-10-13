const Discord = require('discord.js');
const settings = require('../settings.json');

module.exports = {
    Shutdown: async (message, client) => {
        console.log('Fuckoff trigger')
            if (message.author.id == settings.BigID) {
                await message.channel.send("Bye ! ");
                console.log('disconnecting...');
                await await client.destroy();
                console.log('Disconnected');
            }
            else {
                message.channel.send("ask for an admin role fam");
                console.log(message.author.username + 'tried to shut me down');
            }
        }
}