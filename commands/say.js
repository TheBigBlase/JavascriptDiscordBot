const Discord = require('discord.js');
const settings = require('../settings.json');
const chalk = require('chalk');

exports.run = async (message, client, args, terminal,unusedThing) => {
  try{
    if (!terminal) return;
    let place = args.shift();
    switch(place){
      case "dev":
        place=settings.DevPlaceID;
        break;
      case "general":
        place=settings.GeneralID;
        break;
      default:
        console.log(chalk.red("Did not found ") + place);
        return;
        break;
      }
      await client.channels.get(place).send(args.join(" "));
      console.log(chalk.green("Message successfully sent"));
    }
    catch(err){
      console.error(chalk.bgRed("Error in Say : "),err);
    }
};
