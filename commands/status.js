const Discord = require('discord.js');
const settings = require('../settings.json');
const chalk = require('chalk');

exports.run = async (message,client,args,terminal,clientCommands) => {
let status = args.join(" ");
  await client.user.setPresence({
    game: {name: status}
})
  .catch(console.error);
  console.log(chalk.green(`[STATUS] set to ${status}`));
};
