const Discord = require('discord.js');
const settings = require('../settings.json');
const chalk = require('chalk');
//const resolve = require ('resolve');
//const fs = require('fs');

exports.run = async (message,client,args,terminal) => {

    try{
      if (terminal){
          if(args.isEmpty|| args.lenght >1) return console.log(chalk.red("no argument"));
        let commandName = args[0];
          if (!client.has(commandName)) return console.log(chalk.red("No such command to reload"));
        console.log(chalk.blue('checking file : '+ commandName));

        await delete require.cache[require.resolve(`./${commandName}.js`)];
        await client.delete(commandName);
        const props = require(`./${commandName}.js`);
        await client.set(commandName, props);

        console.log(chalk.green("Safly reloaded"));
      }

      else{
        if(args.isEmpty|| args.lenght >1) return message.channel.send("Send me exactly one argument (you are not smart)");
      let commandName = args[0];
        if (!client.has(commandName)) return message.channel.send("No such file to reload");
      console.log(chalk.blue('checking file : '+ commandName));

      await delete require.cache[require.resolve(`./${commandName}.js`)];
      await client.commands.delete(commandName);
      const props = require(`./${commandName}.js`);
      await client.commands.set(commandName, props);

      console.log(chalk.green("Safly reloaded"));
      await client.channels.get(settings.DevPlaceID).send(`I reloaded ${commandName}`);
    }
  }
  catch(err){
    console.error(chalk.bgRed("Error in Reload : ", err));
  }
  };
