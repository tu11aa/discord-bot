const { GatewayIntentBits, Events, Collection } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const cron = require("cron");
const wait = require("node:timers/promises").setTimeout;

require("dotenv").config();
const Client = require("discord.js").Client;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
  ],
});
//settup splash commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

const greet = (channel, check) => {
  channel.send("Hello mọi người, Bot Tú on rồi nèeee");
  if (!check)
    channel.send(
      `Huhu bé online rồi mà chị <@${process.env.QUIN_ID}> chưa onl, Tú lớn và Tú nhỏ đều buồn :((`
    );
};

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const guild = client.guilds.cache.get(process.env.SERVER_ID);
  const channel = guild.channels.cache.get(process.env.CHAT_CHANNEL);
  //check if Quin is online
  guild.members.fetch({ withPresences: true }).then((fetchedMembers) => {
    const totalOnline = fetchedMembers.filter(
      (member) => member.presence && member.presence?.status !== "offline"
    );

    let check = false;
    totalOnline.forEach((member) => {
      if (member.id === process.env.QUIN_ID) check = true;
    });
    greet(channel, check);
  });

  const task = () => {
    guild.members
      .fetch({ withPresences: true })
      .then(async (fetchedMembers) => {
        const totalOnline = fetchedMembers.filter(
          (member) => member.presence?.status !== "offline" && !member.user.bot
        );
        totalOnline.forEach((member) =>
          member.send("Éc quá giờ gòi đi ngủ mauuuuuuuu")
        );
        await wait(1000);
        totalOnline.forEach((member) =>
          member.send("Ngủ đê bé ơi đêm đã khuya gòiiii")
        );
        await wait(1000);
        totalOnline.forEach((member) => member.send("Nhớ đi ngủ đấyyyy"));
      });
  };
  const schedule1 = new cron.CronJob("00 00 01 * * *", task);
  const schedule2 = new cron.CronJob("00 30 01 * * *", task);
  const schedule3 = new cron.CronJob("00 00 02 * * *", task);
  schedule1.start();
  schedule2.start();
  schedule3.start();
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
