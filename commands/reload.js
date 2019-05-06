const Discord = require('discord.js');
const settings = require('../settings.json');
const chalk = require('chalk');
const fs = require('fs');
//const resolve = require ('resolve');

exports.run = async (message,client,args,terminal,clientCommands) => {

    try{
      if (terminal){
          if(args.isEmpty|| args.lenght >1) return console.log(chalk.red("no argument"));
        let commandName = args[0];
<<<<<<< HEAD
          if (!clientCommands.has(commandName)) return console.log(chalk.red("No such command to reload"));
=======

        await CheckModule(commandName,(err) => {return;});

>>>>>>> 80f2bc4cfef33de09dd4ce1bebe9e235f71fbee0

        console.log(chalk.blue('checking file : '+ commandName));
//

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
      console.log(chalk.blue('checking file : '+ commandNamesi));
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



async function CheckModule(commandName){
    try {
      await fs.copyFile(`./commands/${commandName}.js`, `./commands/${commandName}Copy.js`, (err)=>{
      if (err) console.error(chalk.bgRed("Error while copying : ",err));
    });
      //console.log(chalk.green(`${commandName} was copied to ${commandName}Copy`));

            await require(`./${commandName}Copy.js`);
          //  console.log(chalk.green("loaded file copy "));
          await delete require.cache[require.resolve(`./${commandName}Copy.js`)];
        //  console.log(chalk.green("Unloaded file copy "));
          await fs.unlink(`./commands/${commandName}Copy.js`, err=>{ //This is the proof that windows sucks. Unlink only delete in linux.
            if (err) return console.error(chalk.bgRed("Error : ", err));
          });
          //console.log(chalk.green("deleted copy file"));
    }
    catch(err){
      return console.error(chalk.bgRed("Error in CheckModule, Reload : ", err));
    }
}
