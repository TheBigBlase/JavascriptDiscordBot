const Discord = require('discord.js');
const settings = require('../settings.json');
const chalk = require('chalk');
const Enmap = require("enmap");

module.exports= {
  Reload: async (message, client) => {
    console.log("restart triggered");
      if (!settings.mods.includes(message.author.id)) return;
    await message.channel.send("I\'ll restart");
    await client.destroy().then(()=> client.login(settings.token));
    await message.channel.send("Did I missed you ? ");
    console.log(chalk.green("I restarted"));
  },


  ReloadTerminal: async (client, args) => {
    try{
      if(args.length!=1) return console.log(chalk.red(`Need 1 argument. Number given :${args.lenght}`));
      let commandName = args[0];
      delete require.cache[require.resolve(`./${commandName}.js`)];
      client.commands.delete(commandName);
      let props = require(`./${commandName}.js`);
      client.commands.set(commandName, props);
      console.log(chalk.green("Reloaded"));
    }
    catch(err){
      console.error(chalk.red("Error in ReloadTerminal : ", err))
    }
  }
};
