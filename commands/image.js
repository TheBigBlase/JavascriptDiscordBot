const Discord = require('discord.js');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

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


module.exports = {
    Image: async (message, client, args) => {
        console.log('Image is Triggered');
        if(args.length==0){
          console.log("Image with no argument, aborded.")
          await message.channel.send("stop crying and put an argument or read halp")
          return;
        }
        let search = args.join(' ').toString();
        console.log(message.author.username +" asked "+ search);
        message.channel.send("Hey boi ez, plz wait a bit (until the next error)");
        await GoogleImageSearch.searchImage(search).then((res) => {
          console.log(res[0]); // This will return array of image URLs
          message.channel.send('Here is what I have found : ', new Discord.Attachment(res[0],"Picture.png"));
}).catch((err)=> {console.error(err)});

        console.log('image ended');
      }
}
