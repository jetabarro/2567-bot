const Discord = require("discord.js")

const prefix = process.env['prefix']


module.exports = {
	name: 'help',
	description: 'Lists all the commands or info about a specific command.',
	args:false,
	aliases: ['commands'],
	execute(message, args) {
		const data = [];
		const { commands } = message.client;      

		if (!args.length) {
			const embed = new Discord.MessageEmbed()
			.setTitle('Here\'s a list of all my commands:')
      // Set the thumbnail
      .setThumbnail(message.client.user.displayAvatarURL())
			
      // Set the color of the embed
			.setColor(0xff0000)
			.setDescription(`**${commands.map(command => command.name).join('\n')}**\n\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`)
      // Set the footer of the embed
      .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`)
      // Send the embed to the same channel as the message
			
			return message.channel.send(embed)
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}
		const embed = new Discord.MessageEmbed()
			.setTitle(`Name: ${command.name}`)
  		// Set the thumbnail
  		.setThumbnail(message.client.user.displayAvatarURL())
      // Set the color of the embed
      .setColor(0xff0000)
			.addField("Aliases:", `${  command.aliases.join(', ') && command.aliases.length ? command.aliases : 'No aliases'}`)
			.addField("Description:", `${command.description && command.description.length ? command.description: 'None'}`)
      // Set the footer of the embed
      .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`)
      // Send the embed to the same channel as the message

		message.channel.send(embed);

	}
}