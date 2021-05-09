const Discord = require("discord.js")

module.exports = {
	name: 'whoami',
	description: 'I will introduce myself',
	args:false,
	aliases: [],
	execute(message, args) {
		const embed = new Discord.MessageEmbed()
      // Set the title of the field
      .setTitle('Who am I?')
      // Set the image
      .setThumbnail(message.client.user.displayAvatarURL())
      // Set the color of the embed
      .setColor(0xff0000)
      // Set the main content of the embed
      .setDescription(`I'm 2567, a bot made by **<@237184644762566657>**`)
      // Set the footer of the embed
      .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`);
      // Send the embed to the same channel as the message
      message.channel.send(embed);	
	}
}