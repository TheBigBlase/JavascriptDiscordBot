const Discord = require('discord.js');
const settings = require('../settings.json');
const chalk = require('chalk');
//const resolve = require ('resolve');
//const fs = require('fs');

exports.run = async (message,client,args,terminal,clientCommands) => {

    try{
      if (terminal){

          if(args.isEmpty|| args.lenght >1) return console.log(chalk.red("no argument"));
        let commandName = args[0];
          if (!clientCommands.has(commandName)) return console.log(chalk.red("No such command to reload"));
        console.log(chalk.blue('checking file : '+ commandName));
        await delete require.cache[require.resolve(`./${commandName}.js`)];
        await clientCommands.delete(commandName);
        const props = require(`./${commandName}.js`);
        await clientCommands.set(commandName, props);
        console.log(chalk.green("Safly reloaded"));
      }

      else{
        if(args.isEmpty|| args.lenght >1) return message.channel.send("Send me exactly one argument (you are not smart)");
      let commandName = args[0];
        if (!client.commands.has(commandName)) return message.channel.send("No such file to reload");
      console.log(chalk.blue('checking file : '+ commandName));
      await delete require.cache[require.resolve(`./${commandName}.js`)];
      await client.commands.delete(commandName);
      const props = require(`./${commandName}.js`);
      await client.commands.set(commandName, props);
      console.log(chalk.green("Safly reloaded"));
      await message.channel.send(`I reloaded ${commandName}`)
    }
    }
  catch(err){
    console.error(chalk.bgRed("Error in Reload : ", err));
  }
  };

  exports.help={
    name:"reload"
  };


  /*ReloadTerminal: async (client, args) => {
    try{
      if(args.length!=1) return console.log(chalk.red(`Need 1 argument. Number given :${args.lenght}`));
      let commandName=args[0];

      if (!client.commands.has(commandName)) return console.log(chalk.bgRed("No such command"));
      delete require.cache[require.resolve(`./${commandName}.js`)];
       client.commands.delete(commandName);
       const props = require(`./${commandName}.js`);
       client.commands.set(commandName, props);
      console.log(chalk.green("Reloaded"));
  }
    catch(err){
      console.error(chalk.red("Error in ReloadTerminal : ", err))
    }
  },*/
