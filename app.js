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
client.events = new Enmap();
client.settings = new Enmap({name: "settings"});


const init = async () =>{
  try{
  const command =  await readdir('./commands');
  command.forEach(file=>{
    if(!file.endsWith(".js")||file==="ping.js") return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log(chalk.blue(`Attempting to load command ${commandName}`));
  });
  console.log(chalk.green("Loaded all commands"));

  const events = await readdir('./events');
  events.forEach(file=>{
    if(!file.endsWith(".js")) return;
    let event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.events.set(eventName, event);
    console.log(chalk.blue(`Attempting to load event ${eventName}`));
    client.on(eventName, event.bind(null, client)); // not mine xD
  });

  console.log(chalk.green("Loaded all events"));

  client.login(settings.token);
  }
  catch(err){
      console.log(chalk.bgRed("error in init : ",err));
    }
};





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
