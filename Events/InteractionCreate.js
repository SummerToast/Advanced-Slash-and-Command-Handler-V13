/* eslint-disable no-mixed-spaces-and-tabs */
const client = require('../index');
const { owners } = require('../json/owners.json');
const FAILURE_EMOJI = process.env.FAILURE_EMOJI;
const { MessageEmbed } = require('discord.js');

client.on('interactionCreate', async (interaction) => {


	// premium

	// Slash Commands
	if (interaction.isCommand()) {
		const command = client.SlashCommands.get(interaction.commandName);
		// If Command Doesnt exist
		if (!command) {
			return interaction.reply({
				embeds: [
					// eslint-disable-next-line no-undef
					new MessageEmbed()
						.setTitle('**[ERROR]**')
						.setColor('RED')
						.setDescription(`**[Error] ${FAILURE_EMOJI} Command Doesnt exist! / An error Occured.**`),
				],
				ephemeral: true,
			}) && client.SlashCommands.delete(interaction.commandName);
		}

		// User Permissions Check
		if (!interaction.member.permissions.has(command.UserSlashPermission || [])) {
			return interaction.reply({
				embeds: [
					// eslint-disable-next-line no-undef
					new MessageEmbed()
						.setTitle('**[ERROR]**')
						.setColor('RED')
						.setDescription(`**[Error] ${FAILURE_EMOJI} You need \`${command.UserSlashPermission || []}\` Permission. before using this Command!**`),
				],
				ephemeral: true,
			});
		}

		// Under Maintenance Commands
		if (command.MaintenanceMode) {
			if (!owners.includes(interaction.user.id)) {
				return interaction.reply({
					embeds: [
						// eslint-disable-next-line no-undef
						new MessageEmbed()
							.setTitle('**[ERROR]**')
							.setColor('RED')
							.setDescription(`**[Error] ${FAILURE_EMOJI} This command is currently on Maintenance mode, Please use this Command later.**`),
					],
					ephemeral: true,
				});
			}
		}

		// Bot Permissions Check
		if (!interaction.guild.me.permissions.has(command.BotSlashPermission || [])) {
			return interaction.reply({
				embeds: [
					// eslint-disable-next-line no-undef
					new MessageEmbed()
						.setTitle('**[ERROR]**')
						.setColor('RED')
						// eslint-disable-next-line no-undef
						.setDescription(`**[Error] ${FAILURE_EMOJI} I need \`${cmd.botPermissions || []}\` Permission. Before i can Execute this Command!**`),
				],
				ephemeral: true,
			});

		}

		// Owner Only Commands
		if (command.ownerOnly) {
			if (!owners.includes(interaction.user.id)) {
				return interaction.reply({
					embeds: [
						// eslint-disable-next-line no-undef
						new MessageEmbed()
							.setTitle('**[ERROR]**')
							.setColor('RED')
							.setDescription(`**[Error] ${FAILURE_EMOJI} This Command only works for Developer.**`),
					],
					ephemeral: true,
				});
			}
		}

		command.run(client, interaction);
	}

	// Context Menu
	if (interaction.isContextMenu()) {
		const command = client.SlashCommands.get(interaction.commandName);
		if (command) command.run(client, interaction);
	}

});