// commands/say.js

module.exports = {
    name: 'say',
    description: '重複你輸入的內容',
    execute(message, args) {
      if (args.length === 0) {
        return message.reply('請提供要說的內容，例如：`!say Hello`');
      }
  
      const content = args.join(' ');
      message.channel.send(content);
    },
  };
  