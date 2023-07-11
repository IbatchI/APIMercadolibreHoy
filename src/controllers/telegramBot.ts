import { getPaginatedSearches } from "./search";
import { IGetUserAuthInfoRequest } from "../types";
import { ISearch, User } from "../models";
import { Response } from "express";
import { TelegramBot } from "../models/telegramBot/telegramBotModel";
import { telegramBotInstance } from "../app";
import { getProducts } from "../../api-ml/getProduct";
import { getFiltersBySearch } from "./filter";
// import { saveViewedPosts, getUnseenPosts } from './publication';
interface ISearches {
    total: number
    searches: ISearch[];
}

export const saveChatId = async (chatId: number, email: string) => {
    const user = await User.findOne({ email });
    const chatInstanceExist = await TelegramBot.findOne({ chatId });

    if(!user) {
        telegramBotInstance.sendMessage( `No se encontro el usuario ${email}`, chatId);
        return;
    }

    if(chatInstanceExist) {
        telegramBotInstance.sendMessage( `El usuario ${email} ya esta registrado`, chatId);
        return;
    }
    
    const telegramBot = new TelegramBot({ chatId, user });
    await telegramBot.save();
}

// Filtrar links duplicados, using Set
const filterDuplicateLinks = (links: string[]) => {
    const uniqueLinks = new Set(links);
    return Array.from(uniqueLinks);
}

export const getUnseenProducts = async ({searches}: { searches: ISearch[] }) => {
    let productLinks: string[] = [];

    await Promise.all(
        searches.map(async search => {
            const filters = await getFiltersBySearch({ search });
            const { products } = await getProducts({ keyword: search.keyword, filters: filters || undefined });
            // const unseenLinks = await getUnseenPosts({ uniqueIdsFromML: productLinks, searchId: searches[0]._id.toString() })
            const permaLinks = products.map(product => product.permalink);
            productLinks = [...productLinks, ...permaLinks];
        })
    )

    const linksWithOutDuplicates = filterDuplicateLinks(productLinks);
    return linksWithOutDuplicates;
}

// const getUnseenPosts = async ({ uniqueIdsFromML, searchId }: ISaveUnseenPosts) => {
//     const { unseenPosts } = await saveViewedPosts({ uniqueIdsFromML, searchId: searchId });
//     const filteredUnseenProducts = products.filter(product => unseenPosts.includes(product.id));

// }

export const activateAutomaticMessages = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { user } = req;
    const chatInstance = await TelegramBot.findOne({ user });

    const { total, searches }: ISearches = await getPaginatedSearches(100, 0, user);

    const message = `Se activaron las notificaciones para las busquedas: ${searches.map(search => search.keyword).join(', ')} total de busquedas: ${total}`;
    
    if(chatInstance) {
        telegramBotInstance.sendMessage(message, chatInstance.chatId);
  
        const productLinks = await getLinksForSendMessages({ searches });

        // Por cada link enviar un mensaje a telegram
        productLinks.map(async link => {
                console.log({ link })
                telegramBotInstance.sendMessage(link, chatInstance.chatId);
            }
        )
    }


    res.json({
        msg: 'Se activaron las notificaciones'
    })    
}