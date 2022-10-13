const { Client, GatewayIntentBits, Collection } = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = client = new Client({
  restRequestTimeout: 60000,
  intents: [GatewayIntentBits.Guilds],
  presence: {
    status: 'online',
    activities: [{ name: '/help', }]
  }
});


require('./src/deploy-commands'); // Register commands

// Command handling
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'src', 'cmds');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  client.commands.set(command.data.name, command);
}

// Event handling
const eventsPath = path.join(__dirname, 'src', 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(process.env.DISCORD_CLIENT_TOKEN);


//*********//
// EXPRESS //
//*********//

const express = require('express');
const app = express();
const port = process.env.PORT;
app.get('*', (req, res) => {
  res.send('Hello world');
});
app.listen(port, () => console.log(port));