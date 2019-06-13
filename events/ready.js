const Discord = require('discord.js');
const chalk = require('chalk');
const settings = require('../settings.json');

module.exports = async (client, guild) => {

try{
  console.log(chalk.cyan("It's alive ! "));
  client.channels.get(settings.DevPlaceID).send('I\'m online !');
}
catch(err) {
console.log(chalk.bgRed("Error in app.js : Init : ", err));
}
}
