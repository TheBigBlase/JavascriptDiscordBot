const Discord = require('discord.js');
/*
const settings = require('../settings.json');
const shutdown = require('./shutdown.js');
const ping = require('./ping.js');
const image = require('./image.js');
const help = require('./help.js');
const reload = require('./reload.js');
const say = require('./say.js');
*/
const reload = require('./reload.js');
const chalk = require('chalk');
const Enmap = require('enmap');



module.exports = {
    CheckCommand: async (message, client) =>{
      try {
        reload.Load(client.commands);
        //console.log('Check command running');
        let args = [];
          args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
        const calledCommand = args.shift().toLowerCase();
        //console.log('Command = ' + calledCommand + '.');
        switch (calledCommand) { // to do : 2 switch 1 for reading terminal
            case "fuckoff":
                await shutdown.Shutdown(message, client);
                break;
            case "image":
                await image.Image(message, client, args);
                break;
            case "spam":
                await ping.Spam(message, args);
                break;
            case "help":
            case "halp":
                await help.Help(message);
                break;
            case "reload":
                await reload.Reload(message, client);
                break;
            default:
                console.log(chalk.bgYellow('Check command ended without finding anything'));
                break;
        }
        reload.Unload(client.commands);
      }
      catch(err){
        console.error(chalk.bgRed("Error in CheckCommand"), err);
        reload.Unload(client.commands);
      }
    },

    CheckCommandTerminal: async (message,client) => {
      try{
        reload.Load(client.commands);
        let args = [];
        args = message.trim().split(' ');
        const calledCommand = args.shift().toLowerCase();
        switch (calledCommand) { // to do : 2 switch 1 for reading terminal
          case "fuckoff":
              await shutdown.ShutdownTerminal(message, client);
              break;
          case "say":
              await say.SayTerminal(message, client, args);
              break;
          default:
              await console.log(chalk.bgYellow('Check command ended without finding anything'));
              break;
      }
      reload.Unload(client.commands);
    }
    catch(err){
      console.error(chalk.bgRed("Error in CheckCommandTerminal : "), err);
      reload.Unload(client.commands);
    }
  }
};
