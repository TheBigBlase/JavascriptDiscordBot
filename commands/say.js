const Discord = require('discord.js');
const settings = require('../settings.json');
const chalk = require('chalk');

module.exports = {
SayTerminal: async (message, client, args) => {
  try{
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
    await client.channels.get(place).send(args.join(""));
    }
    catch(err){
      console.error(chalk.bgRed("Error in SayTerminal : "),err);
    }
  }
}
