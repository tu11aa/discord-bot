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
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("sleeping_mod")
        .setDescription("Chế độ afk để ngủ nha")
        .addNumberOption((option) =>
          option
            .setName("timer")
            .setDescription("Đặt số phút trước khi bị kick :))")
        )
    )
    .addSubcommand((subCommand) =>
      subCommand.setName("love").setDescription("Yêu ó")
    )
    .addSubcommand((subCommand) =>
      subCommand.setName("hug").setDescription("Ôm nè")
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName("send")
        .setDescription("Hông có")
        .addStringOption((option) =>
          option.setName("message").setDescription("Hông có")
        )
    ),
  async execute(interaction) {
    const subCommand = interaction.options.getSubcommand();
    if (subCommand === "hi") await defalultFunc(interaction);
    else if (subCommand === "play_yt") await play_ytFunc(interaction);
    else if (subCommand === "sleeping_mod") await sleepModFunc(interaction);
    else if (subCommand === "love") await loveFunc(interaction);
    else if (subCommand === "hug") await hugFunc(interaction);
    else if (subCommand === "send") await sendFunc(interaction);
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

const sleepModFunc = async (interaction) => {
  if (!interaction.member.voice.channel)
    return await interaction.reply("Vào kênh đi rồi mới set được nè!");

  const timer = interaction.options.getNumber("timer") ?? 30;
  await interaction.reply(
    `Bé iu ngủ đi đêm đã khuya rồi. ${timer} phút nữa Bot Tú sẽ tắt dùm mọi người nha`
  );
  //timer
  let timerSeconds = Math.floor(timer) * 60;
  while (timerSeconds > 0) {
    await wait(1000);
    timerSeconds -= 1;
    interaction.editReply(
      `Bé iu ngủ đi đêm đã khuya rồi. ${Math.floor(timerSeconds / 60)} phút ${
        timerSeconds % 60
      } giây nữa Bot Tú sẽ tắt dùm mọi người nha`
    );
  }
  //disconnect all member in this channel
  interaction.guild.members
    .fetch({ withPresences: true })
    .then(async (fetchedMembers) => {
      const totalOnline = fetchedMembers.filter(
        (member) => member.presence?.status !== "offline" && !member.user.bot
      );
      totalOnline.forEach((member) => member.voice.disconnect());
    });
};

const loveFunc = async (interaction) => {
  interaction.reply(
    `Boss <@${process.env.ME_ID}> và bé Iu chị <@${process.env.QUIN_ID}> rất rất rất nhiềuuuuuuuuu ♥♥♥`
  );
};

const hugFunc = async (interaction) => {
  interaction.reply(
    `Chỉ Boss <@${process.env.ME_ID}> mới được ôm chị <@${process.env.QUIN_ID}> hoy, hông cho ai khác ôm hết ♥♥♥`
  );
};

const sendFunc = async (interaction) => {
  const message = await interaction.options.getString("message");
  await interaction.guild.channels.cache
    .get(interaction.channelId)
    .send(message); 
  interaction.reply({ content: "Okela", ephemeral: true });
};
