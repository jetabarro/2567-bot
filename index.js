const Discord = require("discord.js")
const Presence = require('./presence')
const bot = new Discord.Client()

const mySecret = process.env['TOKEN']

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`)
})

//Initialize presence
let presenceManager = new Presence(bot);


bot.on('message', (message) => {
  
    if (message.content.substring(0, 1) == '~') {
      
        let messageContent = message.content.substring(1);
        let command = messageContent.split(' ')[0].toLowerCase();
        let parameters = messageContent.substring(messageContent.indexOf(' ') + 1);
        let mentioned = message.mentions.users.first();
				let user;
        switch (command) {

              // handle commands
              case "status":
                if (message.mentions.users.first())
									user = mentioned;
                else
                  user = message.author
								presenceManager.getStatus(user, message.channel,message.guild, message.author);
                break;

							case "live":
								if (message.mentions.users.first())
									user = mentioned;
                else
									user = message.author
                presenceManager.getLive(user, message.channel,message.guild, message.author);
                break;

              case "whoami":
                presenceManager.introduction(message.channel,message.author);
                break;

              case "help":
                presenceManager.help(message.channel,message.author);
                break;
        }
    }
});

bot.login(mySecret)