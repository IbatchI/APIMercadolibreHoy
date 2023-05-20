import { Response } from "express"

import { Publication } from "../models"
import { IGetUserAuthInfoRequest } from "../types"

export const seveUnseenPosts = async (uniquesIdsFromML: Array<string>, searchId: string) => {
    uniquesIdsFromML.map(async (uniqueIdFromML: string) => {
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

export const saveViewedPosts = async (req: IGetUserAuthInfoRequest, res: Response) => {
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
    seveUnseenPosts(uniqueIdsFromML, searchId)
}
