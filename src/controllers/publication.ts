import { connection } from "mongoose"
import { Publication, Search } from "../models"

interface ISaveUnseenPosts {
    uniqueIdsFromML: Array<string>
    searchId: string
}

export const seveUnseenPosts = async ({ uniqueIdsFromML, searchId}: ISaveUnseenPosts) => {
    uniqueIdsFromML.map(async (uniqueIdFromML: string) => {
        try {
            const publicationDb = await Publication.findOne({ uniqueIdFromML })
            if(publicationDb){
                return undefined
            } else {
                const data = {
                    uniqueIdFromML,
                    search: searchId
                }
        
                const publications = new Publication(data)
                await publications.save()
            }
        } catch (error) {
            throw new Error(`${error}`)
        }

    })
}

export const getUnseenPosts = async ({ uniqueIdsFromML, searchId }: ISaveUnseenPosts) => {
    const search = await Search.findById(searchId)
    const unseenPosts = await Publication.find(
        { 
            uniqueIdFromML: { 
                $nin: uniqueIdsFromML 
            },
            search
        }
    )

    const onlyUniquesIdsFromML = unseenPosts.map(unseenPost => unseenPost.uniqueIdFromML)
    return { unseenPosts: onlyUniquesIdsFromML }
}

export const saveViewedPosts = async ({ uniqueIdsFromML, searchId }: ISaveUnseenPosts) => {    
    
    const session = await connection.startSession();
    session.startTransaction();
    try{
        // Publicaciones no vistas por el usuario
        // porque nosotros enviamos un array con las buscadas y en la base de datos
        // tenemos las que ya hemos visto
        const { unseenPosts } = await getUnseenPosts({ uniqueIdsFromML, searchId })
    
        // Ahora guardamos las publicaciones que no hemos visto en la base de datos
        await seveUnseenPosts({ uniqueIdsFromML, searchId })
    
        return { unseenPosts }
    } catch (error) {
        await session.abortTransaction();
        throw new Error(`${error}`)
    } finally {
        session.endSession();
    }
}
