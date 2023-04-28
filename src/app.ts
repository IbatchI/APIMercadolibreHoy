require('dotenv').config();
import Server from './models/server'
import TelegramBotMLHOY from './models/telegramBot/telegramBot';

const server = new Server()
const telegramBot = new TelegramBotMLHOY()

server.listen()
telegramBot.initialize()
