const fs = require('fs');
const Discord = require("discord.js")
const mySecret = process.env['TOKEN']
const prefix = process.env['prefix']
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const bot = new Discord.Client()
bot.commands = new Discord.Collection()


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	bot.commands.set(command.name, command);
}

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`)
})


bot.on('message', (message) => {

		if (!message.content.startsWith(prefix) || message.author.bot) return;
		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return;
		if (command.args && !args.length)	return message.channel.send(`You didn't provide any arguments, ${message.author}!`);

		try {
			bot.commands.get(commandName).execute(message, args);
		} catch (error) {
			console.error(error);
			message.reply('there was an error trying to execute that command!');
		}
});

bot.login(mySecret)