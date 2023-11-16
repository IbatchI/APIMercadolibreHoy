// import TelegramBot from 'node-telegram-bot-api';
// import { saveChatId } from '../../controllers/telegramBot';

// const token: string = process.env.BOT_KEY || '';

// class TelegramBotMLHOY{
//     bot: TelegramBot;

//     constructor() {
//         this.bot = new TelegramBot(
//             token,
//             {
//                 polling: true,
//             }
//         );
//     }

//     // The chatId is getted from the telgramBot table
//     sendMessage(message: string, chatId: number) {
//         this.bot.sendMessage(chatId, message)
//     }

//     initialize() {
//         this.bot.on('message', (msg) => {
//             const chatId = msg.chat.id;
//             const messageText = msg.text || '';
//             const email = messageText.split(' ')[1] || '';

//             saveChatId(chatId, email)
//             // send a message to the chat acknowledging receipt of their message
//             this.sendMessage('Received your message', chatId);
//         });
//     }
// }

// export default TelegramBotMLHOY
