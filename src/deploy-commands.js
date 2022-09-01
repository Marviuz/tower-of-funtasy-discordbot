const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const path = require('path');
const fs = require('fs');

const { DISCORD_CLIENT_TOKEN, DISCORD_CLIENT_ID } = process.env;
const commandsPath = path.join(__dirname, 'cmds');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const commands = [].map(command => command.toJSON());

for (const file of commandFiles) {
  console.log(`Registering ${file}`);
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  commands.push(command.data);
}

const rest = new REST({ version: '10' }).setToken(DISCORD_CLIENT_TOKEN);

rest.put(Routes.applicationCommands(DISCORD_CLIENT_ID), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
