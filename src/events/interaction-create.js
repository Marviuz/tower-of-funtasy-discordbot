module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    
    const command = interaction.client.commands.get(interaction.commandName);

    if(interaction.isAutocomplete()) {
      await command.autocomplete(interaction)
    }

    if (!interaction.isChatInputCommand() || interaction.isButton()) return;

    if (!command) return;

    try {
      const { username, discriminator } = await interaction.user;
      const cmd = await interaction.commandName;
      const { name: guildName, id: guildId } = await interaction.member.guild;

      console.log(`User *${username}#${discriminator}* used *${cmd}* at *${guildName}(guild id: ${guildId})*`);

      await command.execute(await interaction);
    } catch (error) {
      console.error(error);
      await interaction[!await interaction.deferred ? 'reply' : 'editReply']({ content: error.message, ephemeral: true });
    }

  }
};