const client = require('../index.js');
const { owners } = require('../json/owners.json');
const prefix = process.env.PREFIX;
const FAILURE_EMOJI = process.env.FAILURE_EMOJI;
const { MessageEmbed } = require('discord.js');

client.on('messageCreate', async (message) => {
	if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).trim().split(' ');
	const cmd = args.shift().toLowerCase();
	const command = client.commands.get(cmd) || client.commands.find(c => c.aliases?.includes(cmd));

	if (!command) return;
	if (command) {

		// User Permissions Check
		if (!message.member.permissions.has(command.UserPermission || [])) {
			const User = new MessageEmbed()
				.setTitle('**[Error]**')
				.setColor('RED')
				.setDescription(`**[ERROR]: You need \`${command.UserPermission || []}\` Permission. Before Executing this Command!**`);
			return message.channel.send({ embeds: [User] });
		}
		// Under Maintenance Commands
		if (command.maintenance) {
			if (!owners.includes(message.user.id)) {
				{ const MaintenanceMode = new MessageEmbed()
					.setTitle('**[Error]**')
					.setColor('RED')
					.setDescription('**[ERROR]: This Command only works for Developers**');
				return message.channel.send({ embeds: [MaintenanceMode] });
				}
			}
		}

		// Bot Permissions Check
		if (!message.guild.me.permissions.has(command.BotPermission || [])) {
			const Bot = new MessageEmbed()
				.setColor('BLURPLE')
				.setDescription(`**[ERROR]: I need \`${command.BotPermission || []}\` Permission. Before i can Execute this Command.**`);
			return message.channel.send({ embeds: [Bot] });
		}

		// Owner Only Commands
		if (command.ownerOnly) {
			if (!owners.includes(message.user.id)) {
				{ const ownerOnly = new MessageEmbed()
					.setTitle('**[Error]**')
					.setColor('RED')
					.setDescription(`**[ERROR]: ${FAILURE_EMOJI} This Command only works for Developers**`);
				return message.channel.send({ embeds: [ownerOnly] });
				}
			}
		}

		await command.run(client, message, args);
	}
});