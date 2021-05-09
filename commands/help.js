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
		const embed = new Discord.MessageEmbed()
			.setThumbnail(message.client.user.displayAvatarURL())
			.setColor(0xff0000)
			.setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`)

		if (!args.length) {
			embed.setTitle('Here\'s a list of all my commands:')
			embed.setDescription(`**${commands.map(command => command.name).join('\n')}**\n\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`)

			return message.channel.send(embed)
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

			embed.setTitle(`Name: ${command.name}`)
			embed.addField("Aliases:", `${  command.aliases.join(', ') && command.aliases.length ? command.aliases : 'No aliases'}`)
			embed.addField("Description:", `${command.description && command.description.length ? command.description: 'None'}`)

		message.channel.send(embed);

	}
}