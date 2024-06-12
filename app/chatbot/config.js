import { createChatBotMessage } from 'react-chatbot-kit';

const botName = 'Bot';

const config = {
  initialMessages: [createChatBotMessage(`Hello. Nice to meet you.`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#009933',
    },
    chatButton: {
      backgroundColor: '#009933',
    },
  },
};

export default config;