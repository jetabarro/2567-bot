const handler = require('./handler');
const moment = require('moment');
const Discord = require("discord.js")
const bot = new Discord.Client()

const genericParserErrorMessage = "Sorry, I didn't understand that."
const genericSchedulerErrorMessage = "Sorry, I couldn't do that at this time. Please try again later."

const userStatus = {
                    online: "Online",
                    idle: "Idle/Inactive",
                    dnd: "Busy/Do Not Disturb",
                    offline: "Unavailable/Offline"
                }
/**
 * Creates a Presence
 * @param {Object} bot the discord.js bot instance we are using to communicate with discord
 */
function Presence(bot) {

  	/**
    * Use this function to set a get User status
    *
    * @param user the target user mentioned
    * @param channel the discord channel this request is coming from
    * @param server the discord server this request is coming from
		* @param author the author of the request
    */
    this.getStatus = function (user,channel,server,author) {
        var presence = user.presence.activities.length ? user.presence.activities.filter(x=>x.type === "PLAYING") : null;
        const member = server.members.fetch(user);
        const embed = new Discord.MessageEmbed()
          // Set the title of the field
          .setTitle(`Status card of ${user.username}`)
          // Set the image
          .setThumbnail(user.displayAvatarURL())
          .setColor(0xff0000)
          .addField("Username:", `${user.username}`, true)
          .addField("ID:", `${user.id}`, true)
          .addField("Status:", `${userStatus[user.presence.status]}`, true)
          .addField("Game:", `${presence && presence.length ? presence[0].name : 'None'}`, true)
          //.addField("Joined The Server On:", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
          .setFooter(`Replying to ${author.username}#${author.discriminator}`);

        channel.send(embed);
          
        //channel.send(`**<@${user.id}>** is now playing **${user.presence.activities[0].name}**`);

    }

		this.getLive = function (user,channel,server,author) {
        var presence = user.presence.activities.length ? user.presence.activities.filter(x=>x.type === "STREAMING") : null;
        const member = server.members.fetch(user);
        const embed = new Discord.MessageEmbed()
          // Set the title of the field
          .setTitle(`Status card of ${user.username}`)
          // Set the image
          .setThumbnail(user.displayAvatarURL())
          .setColor(0xff0000)
          .addField("Username:", `${user.username}`, true)
          .addField("Stream:", `${presence && presence.length ? presence[0].name : 'Offline'}`, true)
          //.addField("Joined The Server On:", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
          .setFooter(`Replying to ${author.username}#${author.discriminator}`);

        channel.send(embed);
        if(user.presence.activities[0].url)
        	channel.send(`**<@${user.id}>** is now streaming at **${user.presence.activities[0].url}**`);
				else
					channel.send(`**<@${user.id}>** is currently not streaming`);

    }		

    this.introduction = function(channel,author) {

      const embed = new Discord.MessageEmbed()
          // Set the title of the field
          .setTitle('Who am I?')
          // Set the image
          .setThumbnail(bot.user.displayAvatarURL())
          // Set the color of the embed
          .setColor(0xff0000)
          // Set the main content of the embed
          .setDescription(`I'm 2567, a bot made by **<@237184644762566657>**`)
          // Set the footer of the embed
          .setFooter(`Replying to ${author.username}#${author.discriminator}`);
          // Send the embed to the same channel as the message
          channel.send(embed);
    }

    this.help = function(channel,author){

      const embed = new Discord.MessageEmbed()
          // Set the title of the field
          .setTitle('Commands')
          // Set the color of the embed
          .setColor(0xff0000)
          // Set the main content of the embed
          .setDescription(`Here are my commands: \n\n **~help** - lists all my commands\n **~whoami** - i will introduce myself \n **~status** [user] - checks the status of the user or the mentioned user\n`)
          // Set the footer of the embed
          .setFooter(`Replying to ${author.username}#${author.discriminator}`);
          // Send the embed to the same channel as the message
          channel.send(embed);
    }

}

module.exports = Presence;