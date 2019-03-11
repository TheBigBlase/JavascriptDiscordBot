const Discord = require('discord.js');
const settings = require('../settings.json');
const chalk = require('chalk');

module.exports = {
    Shutdown: async (message, client) => {
        console.log('Fuckoff trigger');
        if (settings.mods.includes(message.author.id)) {
            await message.channel.send("Bye ! ");
            console.log('disconnecting...');
            await client.destroy();
            console.log(chalk.red('Disconnected'));
            await process.exit();
        }
        else {
            await message.channel.send("ask for an admin role fam");
            console.log(chalk.red(message.author.username + 'tried to shut me down'));
        }
    },
    ShutdownTerminal: async (message, client)=> {
      console.log('disconnecting...');
      await client.destroy();
      console.log(chalk.red('Disconnected'));
      process.exit();

    }
};
