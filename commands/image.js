const Discord = require('discord.js');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const chalk = require ('chalk');

class GoogleImageSearch {

    /**
     * Function for image search
     *
     * @param  {string} query   Image search filed query
     * @return {Promise}        Returns a promise, with an array of found image URL's
     */
    static async searchImage(query) {
        try {
            // Fetches Items from Google Image Search URL
            let response = await fetch(`https://www.google.com.ua/search?tbm=isch&q=${encodeURIComponent(query)}`, {
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
                    'Referer': 'https://www.google.com.ua/'
                }
            });
            let html = await response.text();
            let $ = cheerio.load(html);
            return $("[data-src]").map((idx, img) =>
                $(img).data('src')
            ).toArray();
        } catch (err) {
            console.error(`Error when try get images for query -> ${query}, error -> ${err}`)
        }
    }
}


exports.run = async (message, client, args, terminal, unusedThing) =>{
      try{
        if (terminal)return console.log(chalk.yellow("No image while in terminal"));
        if (args.length === 0) {
            console.log(chalk.yellow("Image with no argument, aborded."));
            await message.channel.send("stop crying and put an argument or read halp");
            return;
        }
        search = args.toString();
        if (search.includes("<@")) {
           await message.channel.send("FFS I SAID YOU CANT DO THAT, STAHP");
           console.log(chalk.red(message.author.username)+ chalk.blue(" asked for an username in an image"));
           await message.react("🖕");
           return;
         }
        console.log(chalk.blue(message.author.username + " asked ") + search);
        await message.channel.send("Hey boi ez, plz wait a bit (until the next error)");
      }
      catch(err){
      console.error(chalk.bgRed("Error in Image : "), err);
    }
        await GoogleImageSearch.searchImage(args).then((res) => {
            console.log(res[0]); // This will return array of image URLs
            message.channel.send('Here is what I have found : ', new Discord.Attachment(res[0], "Picture.png"));
        }).catch((err) => {
           console.error(err);
           message.channel.send("Error, how surprising");
          });
    };
