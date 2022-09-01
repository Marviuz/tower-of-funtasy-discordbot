module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isChatInputCommand() || interaction.isButton()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(await interaction);
    } catch (error) {
      console.error(error);
      await interaction[!await interaction.deferred ? 'reply' : 'editReply']({ content: error.message, ephemeral: true });
    }

  }
};