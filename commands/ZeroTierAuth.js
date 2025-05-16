module.exports = {
    name: '認證',
    description: 'List',
    execute(message, args) {
        if (args.length < 2) {
            message.channel.reply('!認證 <ID> <Y/N>');
            message.channel.send('算了這個白癡隊友連中文都看不懂');
            return;
        }
        const axios = require('axios');
        require('dotenv').config();

        const apiToken = process.env.ZT_TOKEN;
        const networkId = process.env.NW_ID;
        const memberId = args[0];
        const auth = (args[1] == 'Y');
        const AuthMember = async () => {
          try {
            const response = await axios.post(
              `https://api.zerotier.com/api/v1/network/${networkId}/member/${memberId}`,
              {
                config: {
                  authorized: auth
                }
              },
              {
                headers: {
                  'Authorization': `bearer ${apiToken}`,
                  'Content-Type': 'application/json'
                }
              }
            );
            message.channel.reply('狀態更新結束啦');
            return response;
        
          } catch (error) {
            console.error('Error updating member:', error.response?.data || error.message);
            message.channel.send('根本就沒這個人啊這隊友是不是白癡阿');
          }
        };
        AuthMember();
    },
};
