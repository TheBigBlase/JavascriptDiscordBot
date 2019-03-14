const Discord = require('discord.js');
const settings = require('../settings.json');
const chalk = require('chalk');

exports.run = async (message,client,args,terminal,clientCommands) => {
  try{
    if (terminal) return console.log(chalk.red("Cant spam via terminal"));
     if (settings.mods.includes(message.author.id)) {

       if (message.author.id==settings.ForgottenID){
         console.log(chalk.yellow(message.author.username+" tried to spam"));
         return message.channel.send("No. Just...\n...\n...\nNo.");
        }

        let target = args[0];
        let times = parseInt(args[1]);

        if (!typeof args[0] === 'string' || !args[0] || !args[1] || times<1){
          message.channel.send("Boi give me at least a target and a number");
          return console.log(chalk.red("Not enough infotmation"));
        }


        for (let k = 0; k<times; k++) {
            await message.channel.send(`${target}, ***SPAM*** `);
        }
        console.log(chalk.blue(`I spammed ${times} times`));
    }
    else {
        message.channel.send("Ask for admin role, fam");
        console.log(chalk.yellow("Non admin spam"));
    }

  }
    catch(err) {
      console.error(chalk.bgRed("Error in Spam: : "),err);
}
};
