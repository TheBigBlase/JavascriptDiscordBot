
const Discord = require('discord.js');
const chalk = require('chalk');
const Enmap = require('enmap');

module.exports = (client, guild) => {
  if (!client.settings.has(guild.id)) {
    return console.log(chalk.yellow(`[LEFT] Left a non saved server`));
  }
  else {
    client.settings.delete(guild.id);
    console.log(chalk.yellow(`[LEFT] Left "${guild.name}", now serving ${client.settings.count+1} servers`));
  }

};
