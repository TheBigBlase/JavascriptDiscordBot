const Discord = require('discord.js');
const fs = require('fs');
const chalk = require('chalk');

exports.run  = async (message,client,args,terminal,clientCommands) => {
{
        if(terminal) return;
        console.log(chalk.magenta(message.author.username + " asked for help"));
        var help = fs.readFileSync("./commands/help.txt", { encoding: 'utf-8', flag: 'r' });
        await message.channel.send(help);
        console.log('help ended');
    }
};
