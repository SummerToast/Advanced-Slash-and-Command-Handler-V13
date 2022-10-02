/* eslint-disable no-unused-vars */
const { Client, Message, String, MessageEmbed } = require('discord.js');
const FAILURE_EMOJI = process.env.FAILURE_EMOJI;
const SUCCESS_EMOJI = process.env.SUCCESS_EMOJI;

module.exports = {
	name: '',
	aliases: [''],
	description: [''],
	UserPermissions: [''],
	BotPermissions: [''],
	MaintenanceMode: false,
	ownerOnly: false,
	timeout: 10000,

	/**
     * @param {Client} client
     * @param {Message} message
     * @param {String} args
     * @returns
     */
	// eslint-disable-next-line no-empty-function
	run: async (client, message, args) => {},
};