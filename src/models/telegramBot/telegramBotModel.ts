// import { Schema, model } from "mongoose";

// export interface ITelegramBot {
//   chatId: number;
//   user: Schema.Types.ObjectId;
// }

// const TelegramBotSchema = new Schema<ITelegramBot>({
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   chatId: {
//     type: Number,
//     required: [true, "Se necesita el id del chat para configurar el bot"],
//     unique: true,
//   },
// });

// TelegramBotSchema.methods.toJSON = function () {
//   const { __v, _id, state, ...bot } = this.toObject();
//   bot.uid = _id;
//   return bot;
// };

// export const TelegramBot = model("TelegramBot", TelegramBotSchema);
