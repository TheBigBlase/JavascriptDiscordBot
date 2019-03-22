const Discord = require('discord.js');
const settings = require('../settings.json');
const chalk = require('chalk');

exports.run = async (message,client,args,terminal,unusedThing) => {

    if(terminal){
      await client.channels.get(settings.DevPlaceID).send("Shutdown triggered by terminal");
      await client.destroy();
      console.log(chalk.cyan('Disconnected'));
      process.exit();
    }
    else if (!terminal && settings.mods.includes(message.author.id)) {
      await message.channel.send("Bye ! ");
      await client.destroy();
      console.log(chalk.cyan('Disconnected'));
      await process.exit();
    }
    else {
      await message.channel.send("ask for an admin role fam");
      console.log(chalk.bgYellow(message.author.username + 'tried to shut me down'));
    }
};
