/* eslint-disable no-inline-comments */
require('dotenv').config();

const {
	Collection,
	Client,
} = require('discord.js');

const client = new Client({
	allowedMentions: {
		repliedUser: true,
		parse: ['users', 'roles', 'everyone'],
	},
	intents: 513, // You can change the intents depending on what type of bot your making, you can use https://ziad87.net/intents/ to get the intent number
});
module.exports = client;


client.commands = new Collection();
client.aliases = new Collection();
client.SlashCommands = new Collection();
client.userSettings = new Collection();


require('./Handler/handler')(client);

client.login(process.env.TOKEN);
