const Discord = require('discord.js');
const settings = require('../settings.json');
const chalk = require('chalk')

module.exports= {
  Reload: async (message, client) => {
    console.log("restart triggered");
      if (!settings.mods.includes(message.author.id)) return;
    await message.channel.send("I\'ll restart");
    await client.destroy().then(()=> client.login(settings.token));
    await message.channel.send("Did I missed you ? ");
    console.log(chalk.green("I restarted"));
  },
  ReloadTerminal: async (message) => {
    await client.destroy().then(()=> client.login(settings.token));
    console.log(chalk.green("I restarted"));
  }
};
