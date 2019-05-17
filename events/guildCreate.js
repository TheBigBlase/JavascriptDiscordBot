const Discord = require('discord.js');
const chalk = require('chalk');
const Enmap = require('enmap');




const defaultSettings = {
  adminrole: "Admins",
  modrole: "Mods",
  modlog: "mod-logs"
};

module.exports = (client, guild) => {
  client.settings.set(guild.id, defaultSettings);
  console.log(chalk.green(`[JOIN] Joined "${guild.name}", now serving ${client.settings.count+1} servers`));
};
