import { Response} from "express"
import { IUser, Search } from "../models"
import { IGetUserAuthInfoRequest } from "../types"

const getPaginatedSearches = async (limit: number, from: number, user: IUser | undefined) => {
    const query = { state: true, user: user }
    // get searches by user and sorted by keyword
    const [total, searches] = await Promise.all([
        Search.countDocuments(query),
        Search.find(query)
            .skip(Number(from))
            .limit(Number(limit))
            .sort({ keyword: 'asc' })
    ])

    return {
        total,
        searches
    }
}

export const getAllSearches = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const user = req.user
    const { limit = 5, from = 0 } = req.query

    const {total, searches} = await getPaginatedSearches(Number(limit), Number(from), user)

    res.json({
        total,
        searches
    })
}

export const searchPost = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { keyword } = req.body
    const { user } = req
    const searchDB = await Search.findOne({ keyword, user })

    if(searchDB && searchDB.state === true) {
        return res.status(400).json({
            msg: 'La búsqueda ya existe'
        })
    } else if(searchDB && searchDB.state === false) {
        const search = await Search
            .findByIdAndUpdate(searchDB._id, { state: true })
        return res.status(201).json({msg:`${search?.keyword} guardado con exito`, search})
    }

    const data = {
        keyword,
        user
    }

    const search = new Search(data)
    await search.save()
   

    return res.status(201).json({msg:`${search?.keyword} guardado con exito`, search})
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