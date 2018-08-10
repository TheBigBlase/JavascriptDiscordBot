const Discord = require('discord.js');
const settings = require('../settings.json');
const shutdown = require('./shutdown.js');
const ping = require ('./ping.js')


module.exports = {
    CheckCommand: async (message, client) => {
        shutdown.Shutdown(message, client);
    }
}