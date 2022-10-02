/* eslint-disable no-unused-vars */
const { Client, CommandInteraction, MessageEmbed, Message } = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'Checks bot\'s Uptime and Ping ',
	UserSlashPermissions: [''],
	BotSlashPermissions: [''],
	MaintenanceMode: false,
	ownerOnly: false,
	premium: true,
	/**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {Message} message
     * @param {String[]} args
     */
	// eslint-disable-next-line no-empty-function
	run: async (client, interaction) => {
		const circles = {
			green: '🟢',
			yellow: '🟡',
			red: '🔴',
		};
		let totalSeconds = (client.uptime / 1000);
		const days = Math.floor(totalSeconds / 86400);
		totalSeconds %= 86400;
		const hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = Math.floor(totalSeconds % 60);


		const botLatency = new Date() - interaction.createdAt;
		const apiLatency = client.ws.ping;

		const pingEmbed = new MessageEmbed()
			.setColor('BLURPLE')

			.addField('Bot Latency',
				`\`${botLatency <= 200 ? circles.green : botLatency <= 400 ? circles.yellow : circles.red} ${botLatency} Ms\``
				, false,
			)
			.addField('API Latency',
				`\`${apiLatency <= 200 ? circles.green : apiLatency <= 400 ? circles.yellow : circles.red} ${apiLatency} Ms\``
				, false,
			)
			.addField('Client Uptime',
				`\` ${days} Day(s), ${hours} Hour(s), ${minutes} Minute(s), ${seconds} Second(s) \``
				, false,
			);
		return interaction.reply({ embeds: [pingEmbed] });
	},
};
