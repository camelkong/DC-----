// 引入 Discord.js
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// 建立 client 實例
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// 登入成功後提示
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// 訊息回應事件
client.on('messageCreate', message => {
  if (message.content === '!ping') {
    message.channel.send('Pong!');
  }
});

// 登入機器人
client.login(process.env.API_KEY);
