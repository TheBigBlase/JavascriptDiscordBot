const Discord = require('discord.js');
const chalk = require('chalk');
var fs = require('fs');
var ps = require('pocketsphinx').ps;

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

      modeldir = "/usr/share/pocketsphinx/model/en-us/"

      var config = new ps.Decoder.defaultConfig();
      config.setString("-hmm", modeldir + "en-us");
      config.setString("-dict", modeldir + "cmudict-en-us.dict");
      config.setString("-lm", modeldir + "en-us.lm.bin");
      var decoder = new ps.Decoder(config);
      const receiver = connection.createReceiver();
      console.log(chalk.green(`[VC] listenning in channel ${channel.name} in server ${message.guild.name}`) +connection.channel.id);
      receiver.on('opus', buffer => {
        listen(buffer);
        if (err) throw err;
    });

  });
}
  catch (err){
    console.error(chalk.bgRed("error in join : ", err));
  }
};





function listen(data) {
    decoder.startUtt();
    decoder.processRaw(data, false, false);
    decoder.endUtt();
    console.log(decoder.hyp())
}
