const Discord = require('discord.js');
const settings = require('../settings.json');

module.exports= {
  Reload: async (message, client) => {
    console.log("restart triggered");
    await message.channel.send("I\'ll restart");
    await client.destroy().then(()=> client.login(settings.token));
    await message.channel.send("Did I missed you ? ");
    console.log("I restarted. All is fine for now.");
  }
};
