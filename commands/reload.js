const Discord = require('discord.js');
const settings = require('../settings.json');
const chalk = require('chalk');
const fs = require('fs');

exports.run = async (message,client,args,terminal) => {

  //  try{
  if(args.isEmpty|| args.lenght >1) return console.log(chalk.red("no argument"));
  let commandName = args[0];


    if(!terminal){

        if (!client.commands.has(commandName)&& !client.events.has(commandName))
          return message.channel.send("No such file to reload");

        await CheckModule(commandName,client,(err) => {return console.error(chalk.bgRed("Error in CheckModule", err));;});
        await message.channel.send(`I reloaded ${commandName}`)
    }


    else {
      await CheckModule(commandName,client,(err) => {return console.error(chalk.bgRed("Error in CheckModule", err));;});
    }
  };





async function CheckModule(commandName, client){
    try {
      if (client.commands.has(commandName)){
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
          console.log(chalk.blue('checking file : '+ commandName));
  //

          await delete require.cache[require.resolve(`./${commandName}.js`)];
          await client.commands.delete(commandName);
          const props = require(`./${commandName}.js`);
          await client.commands.set(commandName, props);
          console.log(chalk.green("Safly reloaded"));
          //console.log(chalk.green("deleted copy file"));
    }


    else if (client.events.has(commandName)){
      await fs.copyFile(`./events/${commandName}.js`, `./events/${commandName}Copy.js`, (err)=>{
      if (err) console.error(chalk.bgRed("Error while copying : ",err));
    });
      //console.log(chalk.green(`${commandName} was copied to ${commandName}Copy`));

            await require(`../events/${commandName}Copy.js`);
          //  console.log(chalk.green("loaded file copy "));
          await delete require.cache[require.resolve(`../events/${commandName}Copy.js`)];
        //  console.log(chalk.green("Unloaded file copy "));
          await fs.unlink(`./events/${commandName}Copy.js`, err=>{ //This is the proof that windows sucks. Unlink only delete in linux.
            if (err) return console.error(chalk.bgRed("Error : ", err));
          });
          console.log(chalk.blue('checking file : '+ commandName));
  //

          await delete require.cache[require.resolve(`../events/${commandName}.js`)];
          await client.events.delete(commandName);
          const props = require(`../events/${commandName}.js`);
          await client.events.set(commandName, props);
          console.log(chalk.green("Safly reloaded"));

    }
  }
    catch(err){
      return console.error(chalk.bgRed("Error in CheckModule, Reload : ", err));
    }

}
