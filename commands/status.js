const Discord = require("discord.js")
const moment = require('moment');

module.exports = {
	name: 'status',
	description: 'Gets the status of the user or the mentioned user',
	args:false,
	aliases: ['user'],
	execute(message, args) {
    var mentioned = message.mentions.users.first()
		var user = message.author
		var server = message.guild
		var author = message.author

		const userStatus = {
                    online: "Online",
                    idle: "Idle/Inactive",
                    dnd: "Busy/Do Not Disturb",
                    offline: "Unavailable/Offline"
                }

		if (mentioned){
			user = mentioned
		}

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

		message.channel.send(embed);
	},
};