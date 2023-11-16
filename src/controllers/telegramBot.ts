// import { getPaginatedSearches } from "./search";
// import { IGetUserAuthInfoRequest } from "../types";
// import { Response } from "express";
// import { TelegramBot } from "../models/telegramBot/telegramBotModel";
// // import { telegramBotInstance } from "..";
// import { ISearch, User } from "../models";

// export const saveChatId = async (chatId: number, email: string) => {
//   const user = await User.findOne({ email });
//   const chatInstanceExist = await TelegramBot.findOne({ chatId });

//   if (!user) {
//     telegramBotInstance.sendMessage(
//       `No se encontro el usuario ${email}`,
//       chatId
//     );
//     return;
//   }

//   if (chatInstanceExist) {
//     telegramBotInstance.sendMessage(
//       `El usuario ${email} ya esta registrado`,
//       chatId
//     );
//     return;
//   }

//   const telegramBot = new TelegramBot({ chatId, user });
//   await telegramBot.save();
// };

// export const activateAutomaticMessages = async (
//   req: IGetUserAuthInfoRequest,
//   res: Response
// ) => {
//   const { user } = req;
//   const chatInstance = await TelegramBot.findOne({ user });

//   const { total, searches }: { total: number; searches: ISearch[] } =
//     await getPaginatedSearches(100, 0, user);

//   const message = `Se activaron las notificaciones para las busquedas: ${searches
//     .map((search) => search.keyword)
//     .join(", ")} total de busquedas: ${total}`;

//   if (chatInstance) {
//     telegramBotInstance.sendMessage(message, chatInstance.chatId);
//   }

//   res.json({
//     msg: "Se activaron las notificaciones",
//   });
//   // Despues aca activamos los jobs
// };
