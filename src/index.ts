require("dotenv").config();
import Server from "./models/server";
// import TelegramBotMLHOY from './models/telegramBot/telegramBot';

const server = new Server();
// export const telegramBotInstance = new TelegramBotMLHOY()

server.listen();
// telegramBotInstance.initialize();
