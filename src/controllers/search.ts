import { Response} from "express"
import { connection } from "mongoose"
import { Filter, IUser, Search } from "../models"
import { IGetUserAuthInfoRequest, TypesOfFilters } from "../types"

const getPaginatedSearches = async (limit: number, from: number, user: IUser | undefined) => {
    const query = { state: true, user}
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

    console.log({searches})

    const searchesWithFilters = await Promise.all(searches.map(async search => {
        const filters = await Filter.find({ search })
        const objetSearch = search.toObject()
        const searchWithUid = {
            ...objetSearch,
            uid: objetSearch._id
        }

        const mappedFilters = filters.map(filter => {
            const objetFilter = filter.filter
            return {
                ...objetFilter,
                uid: filter._id
            }
        })

        return {
            ...searchWithUid,
            filters: mappedFilters
        }
    }))

    res.json({
        total,
        searches: searchesWithFilters
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
    } else {
        const session = await connection.startSession();
        session.startTransaction();
        try{
            const data = {
                keyword,
                user
            }
        
            const search = new Search(data)
            await search.save()

            const filter = new Filter({ search: search._id, filter: { type: TypesOfFilters.ALREADY_SEEN , value: false } })

            await filter.save()
            await session.commitTransaction();
           
            return res.status(201).json({msg:`${search?.keyword} guardado con exito`, search})
        } catch (error) {
            await session.abortTransaction();
            return res.status(500).json({msg: 'Error en el servidor'})
        } finally {
            session.endSession();}
    }

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