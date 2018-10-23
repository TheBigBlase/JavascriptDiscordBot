const Discord = require('discord.js');
const settings = require('../settings.json');
const shutdown = require('./shutdown.js');
const ping = require('./ping.js');
const food = require('./Food.js');


module.exports = {
    CheckCommand: async (message, client) => {
        console.log('Check command running');
        let args = [];
        args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
        const calledCommand = args.shift().toLowerCase();
        console.log('Command = ' + calledCommand + '.');

        switch (calledCommand) {
            case "fuckoff":
                await shutdown.Shutdown(message, client);
                break;
            case "food":
                await food.Food(message, client, args);
                break;
            case "spam":
                await ping.Spam(message, args);
                break;
            default:
                console.log('Check command ended without finding anything');
                break;
        }
    }
}