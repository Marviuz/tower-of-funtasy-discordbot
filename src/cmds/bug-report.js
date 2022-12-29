const path = require('path');
const { SlashCommandBuilder } = require('discord.js');
const { Octokit } = require('@octokit/core');
const { RED } = require('../utils/app-constants');

const NAME = path.parse(__filename).name;
const DESCRIPTION = 'Warn the staff of a bug found';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

module.exports = {
  name: NAME,
  description: DESCRIPTION,
  type: 'tof',
  data: new SlashCommandBuilder()
    .setName(NAME)
    .setDescription(DESCRIPTION)
    .addStringOption(option =>
      option.setName('title')
        .setDescription('Subject/bug title')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('description')
        .setDescription('Bug description')
        .setRequired(true)
    ),
  async execute(interaction) {
    const title = await interaction.options.getString('title');
    const description = await interaction.options.getString('description');

    await interaction.deferReply();

    try {
      const res = await octokit.request('POST /repos/{owner}/{repo}/issues', {
        owner: 'Marviuz',
        repo: 'tower-of-funtasy-discordbot',
        title: `[BUG] ${title}`,
        body: `By: ${interaction.user.tag}\n${description}`,
        labels: [
          'bug'
        ]
      });

      await interaction.editReply({ embeds: [{ title: 'Bug sent!', color: RED, description: res.data.html_url }] });
    } catch (err) {
      console.error(err);
      await interaction.editReply({ embeds: [{ title: 'Something went wrong!!!', color: RED }] });
    }
  },
};
