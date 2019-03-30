const Discord = require('discord.js');
const chalk = require('chalk');

exports.run = async (message, client, args, terminal, clientCommands) => {
  try{

    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

      if(!terminal){
        await message.channel.send(`${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds since last error.`);
      }
      else{
        console.log(chalk.magenta(`I've been online for ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`));
      }
}
  catch(err){
    console.error(chalk.bgRed(`Error in upTime : `),err)
  }
};
