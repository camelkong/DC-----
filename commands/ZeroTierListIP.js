module.exports = {
  name: '成員',
  description: 'List',
  execute(message, args) {
    const axios = require('axios');
    require('dotenv').config();

    const apiToken = process.env.ZT_TOKEN;
    const networkId = process.env.NW_ID;

    const listMembers = async () => {
      try {
        const response = await axios.get(`https://api.zerotier.com/api/v1/network/${networkId}/member`, {
          headers: {
            'Authorization': `bearer ${apiToken}`
          }
        });
    
        const members = response.data;
    
        const memberTexts = members
        .filter(member => args.length === 0 || args == member.nodeId)
        .map(member => {
            return [
              `- ID: ${member.nodeId}`,
              `- 已驗證: ${member.config?.authorized}`,
              `- IP: ${member.config?.ipAssignments?.join(', ') || 'none'}`,
              '---------------------------'
              ].join('\n');
        });
    
        if(memberTexts.length === 0) {
          console.log('找不到指定成員');
          return '找不到指定成員';
        }
        else {
          return memberTexts.join('\n');
        }
      } catch (error) {
        return `Failed to fetch members: ${error.response?.data?.message || error.message}`;
      }
    };

    listMembers().then(result => {
      if(result)
        message.channel.reply(result);
    })
  },
};
