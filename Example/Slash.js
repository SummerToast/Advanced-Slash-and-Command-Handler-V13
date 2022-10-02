/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const FAILURE_EMOJI = process.env.FAILURE_EMOJI;
const SUCCESS_EMOJI = process.env.SUCCESS_EMOJI;

module.exports = {
	name: '',
	description: '',
	UserSlashPermissions: [''],
	BotSlashPermissions: [''],
	MaintenanceMode: false,
	ownerOnly: false,
	/**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
	// eslint-disable-next-line no-empty-function
	run: async (client, interaction) => {},
};