const { SlashCommandBuilder } = require("discord.js");
require("dotenv").config();
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tu_oi")
    .setDescription("Nhớ Tú thì kêu Tú điii")
    .addSubcommand((subcommand) =>
      subcommand.setName("hi").setDescription("Say Hi")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("play_yt").setDescription("Play Youtube music")
    ),
  async execute(interaction) {
    const subCommand = interaction.options.getSubcommand();
    if (subCommand === "hi") await defalultFunc(interaction);
    else if (subCommand === "play_yt") await play_ytFunc(interaction);
  },
};

const defalultFunc = async (interaction) => {
  await interaction.reply("Hello bé êu của Túuuu");
  const sender = interaction.member;
  if (sender.id === process.env.QUIN_ID) {
    await wait(500);
    await interaction.editReply(
      `Úi bé <@${sender.id}> hở, iu bé nhiềuuuuuu!!!`
    );
    await wait(500);
    await interaction.followUp(
      "Chị là t2 hông ai chủ nhật. Chị Quìn mãi đỉnhhhhh♥♥♥"
    );
  } else if (sender.id === process.env.ME_ID) {
    await wait(500);
    await interaction.editReply(`Úi BOSS <@${sender.id}> hở!!!`);
    await wait(500);
    await interaction.followUp("Đại ca muôn năm♥♥♥");
  }
};

const play_ytFunc = async (interaction) => {
  // await interaction.reply("Playing YT");
  await interaction.deferReply();
  if (!interaction.member.voice?.channel)
    return interaction.editReply("Connect to a Voice Channel");
};
