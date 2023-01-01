import { Response, Request} from "express"
import { Search } from "../models"
import { IGetUserAuthInfoRequest } from "../types"

const getPaginatedSearches = async (limit: number, from: number) => {
    const query = { state: true }
    const [total, searches] = await Promise.all([
        Search.countDocuments(query),
        Search.find(query)
            .skip(Number(from))
            .limit(Number(limit)),
    ])

    return {
        total,
        searches
    }
}

export const getAllSearches = async (req: Request, res: Response) => {
    const { limit = 5, from = 0 } = req.query

    const {total, searches} = await getPaginatedSearches(Number(limit), Number(from))

    res.json({
        total,
        searches
    })
}

export const searchPost = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { keyword } = req.body
    const { user } = req
    const searchDB = await Search.findOne({ keyword })

    if(searchDB && searchDB.state === true) {
        return res.status(400).json({
            msg: 'La búsqueda ya existe'
        })
    } else if(searchDB && searchDB.state === false) {
        const search = await Search
            .findByIdAndUpdate(searchDB._id, { state: true })
        const {total, searches} = await getPaginatedSearches(Number(5), Number(0))
        return res.status(201).json({msg:`${search?.keyword} guardado con exito`, search, total, searches})
    }

    const data = {
        keyword,
        user
    }

    const search = new Search(data)
    await search.save()

    const {total, searches} = await getPaginatedSearches(Number(5), Number(0))

    return res.status(201).json({msg:`${search?.keyword} guardado con exito`, search, total, searches})
}

export const searchDelete = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { id } = req.params
    const search = await Search.findByIdAndUpdate(id, { state: false })

    res.json({ 
        msg: 'Búsqueda eliminada',
        searchDeleted: search,
        userLogued: req.user 
    });
}

export const searchPut = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { id } = req.params
    const { keyword } = req.body

    const search = await Search.findByIdAndUpdate(id, {keyword})

    res.json({ 
        msg: 'Búsqueda actualizada',
        searchEdited: search,
        userLogued: req.user
    });
}