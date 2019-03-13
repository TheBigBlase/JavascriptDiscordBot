const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
//const command = require('./commands/command.js');
const ping = require('./commands/ping.js');
const stdin = process.openStdin();
const chalk = require('chalk');

const {promisify} = require('util');

const readdir = promisify(require('fs').readdir);
const Enmap = require('enmap');

client.commands = new Enmap();


const init = async () =>{
  const command = await readdir('./commands');
  command.forEach(file=>{
    if(!file.endsWith(".js")||file==="ping.js") return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log(chalk.blue(`Attempting to load ${commandName}`));
  });
  console.log(chalk.green("Loaded all commands"));

    client.on('ready', () => {
        console.log(chalk.cyan('Ready to kick some ass'));
        client.channels.get(settings.DevPlaceID).send('I\'m online !');
  });
  }





client.on('message', async message => {
    let terminal = false;
    if (message.author.bot && !message.author.id === settings.BotID) return;
    ping.BigPing(message, client);
    ping.BotPing(message, client);
    if (!message.content.startsWith(settings.prefix)) return;

    message.content = message.content.toLowerCase();
    args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const calledCommand = args.shift();

    if(!client.commands.get(calledCommand)) return;

    client.commands.get(calledCommand).run(message, client, args, terminal);
});

client.login(settings.token);



stdin.addListener("data", async function(d) {
  try{
    let terminal = true;
    let args = [];

    d = d.toString().slice(0,-1).toLowerCase();
    args = d.trim().split(' ');
    const calledCommand = args.shift();

    if(!client.commands.get(calledCommand)) return console.log("No such command");
    client.commands.get(calledCommand).run(d, client.commands, args, terminal);
  }
  catch(err){
    console.error(chalk.red("Error while reading terminal : ",err));
  }
    });

init();
