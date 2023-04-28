import { Response } from "express";
import { TelegramBot } from "../models/telegramBot/telegramBotModel";
import { IGetUserAuthInfoRequest } from "../types";

export const saveChatId = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { chatId } = req.body;
    const { user } = req;

    const telegramBot = new TelegramBot({ chatId, user });
    await telegramBot.save();
    res.json({ msg: 'Su chat ha sido configurado exitosamente' });
}