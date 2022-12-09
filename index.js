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


//**********//
// MONGO_DB //
//**********//
const { connect } = require('mongoose');
const { getallChannel } = require('./src/db/models/provider');
const schedule = require('node-schedule');
const daily_message = require('./src/utils/daily-message');

client.on("ready", async () => {
  await connect(
    process.env.MONGODB_URI,
    {
      keepAlive: true,
    }
  ).then(async () => {
    console.log('Database Connected!');

    const channels = (await getallChannel());

    channels.forEach(channel => {  // Registering all channels with game daily information was active
      let rule = new schedule.RecurrenceRule();

      rule.hour = 5;
      rule.minute = 0;
      rule.tz = channel.TimeZone;

      schedule.scheduleJob(rule, () => {
        client.channels.cache.get(channel.Channel_id).send({ embeds: [daily_message(channel.TimeZone)] });
      });
    });
  });
});

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
