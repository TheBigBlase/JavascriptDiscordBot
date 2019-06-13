const Discord = require('discord.js');
const chalk = require('chalk');
const speech = require('speech-to-text');


exports.run = async (message,client,args,terminal) => {
  try{
  if (terminal) return;
  let channel = message.member.voiceChannel;
  if(!channel) return message.channel.send("First, connect yourself in a vocal channel");
  if(!channel.joinable) return message.channel.send("I cant join this vocal channel for some reasons");


  if(message.guild.voiceConnection) return await message.channel.send("I am already in a channel ");
  channel.join()
  .then(connection => {
    console.log(chalk.green(`[VC] connected in channel ${channel.name} in server ${message.guild.name}`) +connection.channel.id);
  });
}
  catch (err){
    console.error(chalk.bgRed("error in join : ", err));
  }
};
