import { Response, Request} from "express"
import Search from "../models/search"
import { IGetUserAuthInfoRequest } from "../types"

export const getAllSearches = async (req: Request, res: Response) => {
    const { limit = 5, from = 0 } = req.params
    const query = { state: true }

    const [total, searches] = await Promise.all([
        Search.countDocuments(query),
        Search.find(query)
            .skip(Number(from))
            .limit(Number(limit)),
    ])

    res.json({
        total,
        searches
    })

}

export const searchPost = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { keyword, wantedPrice, uid } = req.body
    const keywordDB = await Search.findOne({ keyword })

    if(keywordDB) {
        return res.status(400).json({
            message: 'La búsqueda ya existe'
        })
    }

    const data = {
        keyword,
        wantedPrice,
        user: uid
    }

    const search = new Search(data)
    await search.save()

    return res.status(201).json(search)
}

export const searchDelete = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { id } = req.params
    const search = await Search.findByIdAndUpdate(id, { state: false })

    res.json({ 
        message: 'Búsqueda eliminada',
        searchDeleted: search,
        userLogued: req.user 
    });
}

export const searchPut = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { id } = req.params
    const { keyword, wantedPrice } = req.body

    const search = await Search.findByIdAndUpdate(id, {keyword, wantedPrice})

    res.json({ 
        message: 'Búsqueda actualizada',
        searchEdited: search,
        userLogued: req.user
    });
}