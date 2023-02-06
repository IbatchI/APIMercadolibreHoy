import { Response } from "express"

import { Publication } from "../models"
import { IGetUserAuthInfoRequest } from "../types"

// this url recevies an array of uniqueIdsFromML and return an array of publications that are not saved in the db
// .../unseenPosts esto quiere decir que va a devolver las publicaciones que no hemos visto en la pagina web
export const getAllPublications = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { uniqueIdsFromML, searchId} = req.body
    
    // publicaciones no vistas por el usuario
    // porque nosotros enviamos un array con las buscadas y en la base de datos
    // tenemos las que ya hemos visto
    const publicationsNotSeen = await Publication.find({ uniqueIdFromML: { $nin: uniqueIdsFromML }, search: searchId})

    res.json({
        msg: 'Publicaciones',
        uniqueIdsFromML: publicationsNotSeen.map((publication) => publication.uniqueIdFromML)
    })

    // Ahora guardamos las publicaciones que no hemos visto en la base de datos
    uniqueIdsFromML.map(async (uniqueIdFromML: string) => {
        const publicationDb = await Publication.findOne({ uniqueIdFromML })
        if(publicationDb) return

        const data = {
            uniqueIdFromML,
            search: searchId
        }

        const publications = new Publication(data)
        await publications.save()
    })
}
  