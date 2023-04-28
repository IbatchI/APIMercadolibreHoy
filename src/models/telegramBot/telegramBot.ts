import TelegramBot from 'node-telegram-bot-api';

const token: string = process.env.BOT_KEY || '';

class TelegramBotMLHOY{
    bot: TelegramBot;
    chatId: number;

    constructor() {
        this.bot = new TelegramBot(
            token, 
            {
                polling: true,
            } 
        );
        this.chatId = 0
    }

    sendMessage(message: string) {
        this.bot.sendMessage(this.chatId, message)
    }

    initialize() {
        this.bot.on('message', (msg) => {
            const chatId = msg.chat.id;
            this.setChatId(chatId)
            // send a message to the chat acknowledging receipt of their message
            this.bot.sendMessage(chatId, 'Received your message');
        });
    }
 
    /*
        * Setters and getters
    */
    setChatId(chatId: number) {
        this.chatId = chatId
    }
}

export default TelegramBotMLHOY