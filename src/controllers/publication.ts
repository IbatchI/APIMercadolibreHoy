import { Response, Request} from "express"

import { Publication, Search } from "../models"

export const getAllPublications = async (req: Request, res: Response) => {
    const { limit = 5, from = 0, viewed = false } = req.params
    const query = { viewed }

    const [total, publications] = await Promise.all([
        Publication.countDocuments(query),
        Publication.find(query)
            .skip(Number(from))
            .limit(Number(limit)),
    ])

    res.json({
        total,
        publications
    })

}

export const publicationPost = async (req: Request, res: Response) => {
    const { link, price, title, uniqueIdFromML, searchId} = req.body
    const uniqueId = await Publication.findOne({ uniqueIdFromML })

    if(uniqueId) {
        return res.status(400).json({
            msg: 'El producto ya existe'
        })
    }

    const search = await Search.findById(searchId)

    const data = {
        link, price, title, uniqueIdFromML,
        search
    }

    const publication = new Publication(data)
    await publication.save()

    return res.status(201).json(publication)
}

export const publicationDelete = async (req: Request, res: Response) => {
    const { id } = req.params
    const publication = await Publication.findByIdAndRemove(id)

    res.json({ 
        msg: 'Publicacion eliminada',
        publicationDeleted: publication,
    });
}

// this url get an array of publications and update the viewed property to true
export const markPublicationAsViewedPut = async (req: Request, res: Response) => {
    const { viewedPublications } = req.body
    if(viewedPublications?.length > 0) {
        const publications = await Publication.updateMany({ _id: { $in: viewedPublications } }, { viewed: true })
        const numberOfUpdatedPublications = publications.modifiedCount
        
        res.json({
            msg: `${numberOfUpdatedPublications} publicaciones fueron marcadas como vistas`,
            numberOfUpdatedPublications
        })
    } else {
        return res.status(400).json({
            msg: 'No hay publicaciones para actualizar'
        })
    }
}
  