const Discord = require('discord.js');
const settings = require('../settings.json');
const chalk = require('chalk');

exports.run = async (message,client,args,terminal) => {
let status = args.join(" ");
  await client.user.setPresence({
    game: {name: status}
})
  .catch(console.error);

  if(terminal) console.log(chalk.green(`[STATUS] set to \"${status}\"`));
  if(!terminal) console.log(chalk.green(`[STATUS] set to ${status},requested by ${message.author.username}, in guild ${message.guild.name}`))
};
