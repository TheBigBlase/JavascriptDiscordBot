const Discord = require('discord.js');
const settings = require('../settings.json');
const shutdown = require('./shutdown.js');
const ping = require('./ping.js');
const image = require('./image.js');
const help = require('./help.js');
const reload = require('./reload.js')
const chalk = require('chalk')



module.exports = {
    CheckCommand: async (message, client) => {
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
    },

    CheckCommandTerminal: async (message,client) => {
      console.log('message =>' + message+".");
       switch (message) { // to do : 2 switch 1 for reading terminal
          case "fuckoff":
              await shutdown.ShutdownTerminal(message, client);
              break;
          case "reload":
              await reload.ReloadTerminal(message, client);
              break;
          default:
              await console.log(chalk.bgYellow('Check command ended without finding anything'));
              break;
      }
    }
};
