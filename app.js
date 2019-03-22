const Discord = require('discord.js');
const client = new Discord.Client();

const settings = require('./settings.json');
const ping = require('./commands/ping.js');
const stdin = process.openStdin();
const chalk = require('chalk');
const {promisify, addListener} = require('util');
const readdir = promisify(require('fs').readdir);

const Enmap = require('enmap');
client.commands = new Enmap();

let oldClientPing=client.ping;


const updatePresence = async ()=>{
  clientPing = client.pings[0];
  await client.user.setPresence({
    game: {
      name: `Ping : ${clientPing}`,
      type: 'WATCHING'
    }
  })
}


const init = async () =>{
  try{
  const command =  await readdir('./commands');
  command.forEach(file=>{
    if(!file.endsWith(".js")||file==="ping.js") return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log(chalk.blue(`Attempting to load ${commandName}`));
  });
  console.log(chalk.green("Loaded all commands"));
  client.login(settings.token);
  }
  catch(err){
      console.log(chalk.bgRed("error in init : ",err));
    }
};



    client.on('ready', async() => {
      try{
        console.log(chalk.cyan('Ready to kick some ass'));
        client.channels.get(settings.DevPlaceID).send('I\'m online !');
        updatePresence();

        await setInterval(() => {
          updatePresence();

        }, 40000);
    }
      catch(err) {
      console.log(chalk.bgRed("Error in app.js : Init : ", err));
    }});






client.on('message', async message => {
    let nothing;
    let terminal = false;
    if (message.author.bot) return;
    ping.BigPing(message, client);
    ping.BotPing(message, client);

        message.content = message.content.toLowerCase();
        args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
        const calledCommand = args.shift();

    if (!message.content.startsWith(settings.prefix)) return;

    if(!client.commands.get(calledCommand)) return;

    client.commands.get(calledCommand).run(message, client, args, terminal, nothing);
});






stdin.addListener("data", async function(d) {
  try{
    let terminal = true;
    let args = [];

    d = d.toString().slice(0,-1).toLowerCase();
    args = d.trim().split(' ');
    const calledCommand = args.shift();

    if(!client.commands.get(calledCommand)) return console.log(chalk.yellow("No such command"));
    client.commands.get(calledCommand).run(d, client, args, terminal,client.commands);
  }
  catch(err){
    console.error(chalk.red("Error while reading terminal : ",err));
  }
    });

init();
