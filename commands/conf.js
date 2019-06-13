const Discord = require('discord.js');
const settings = require('../settings.json');
const chalk = require('chalk');


exports.run = async (message,client,args,terminal) => {
  if (terminal) return;
  if (!message.member.hasPermission("ADMINISTRATOR")) return await message.channel.send("Seems like you aren't admin");
  if (args.lenght>2) return await message.channel.send("Too many arguments");

  const [prop, ...value] = args;
  console.log(chalk.green(prop, value, args.length));

  if(!client.settings.has(message.guild.id, prop)) {
     return message.channel.send("This key is not in the configuration.\n Key in config are : modlog, modrole and adminrole.");
   }


  client.settings.set(message.guild.id, value.join(" "), prop); // not my code
  await message.channel.send(`Guild configuration item ${prop} has been changed to:\n\`${value.join(" ")}\``);
};
