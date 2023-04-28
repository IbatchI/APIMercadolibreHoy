import { Response} from "express"
import { connection } from "mongoose"
import { Filter, IUser, Search } from "../models"
import { IGetUserAuthInfoRequest } from "../types"

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

    const searchesWithFilters = await Promise.all(searches.map(async search => {
        const filters = await Filter.findOne({ search })
        const objetSearch = search.toObject()
        const { __v, _id, state, user, ...searchWithoutV } = objetSearch
        
        // map search with uid
        const searchWithUid = {
            ...searchWithoutV,
            uid: objetSearch._id,
        }
     

        return {
            ...searchWithUid,
            filters
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
        const data = {
            keyword,
            user
        }
    
        const search = new Search(data)
        await search.save()

        // TODO: sacar el usuario de la respuesta
        return res.status(201).json({msg:`${search?.keyword} guardado con exito`, search })
    }

}

export const searchDelete = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { id } = req.params
    const search = await Search.findByIdAndUpdate(id, { state: false })
    // TODO: se puede hacer que se reciba como parametro si se quiere eliminar de la base de datos
    // Si es asi tambien tendriamos que borrar los filtros asociados a la busqueda

    res.json({ 
        msg: 'Búsqueda eliminada',
        searchDeleted: search,
        userLogued: req.user 
    });
}

export const searchPut = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { id: searchId } = req.params
    const { keyword, filters} = req.body
    const { minPrice, maxPrice, alreadySeen, uid: filtersId } = filters

    const session = await connection.startSession();
    session.startTransaction();
    try {
        const search = await Search.findByIdAndUpdate(searchId, { keyword })
        search?.save()
    
        // update filter of search
        const filtersBySearch = await Filter.findByIdAndUpdate(filtersId, { minPrice, maxPrice, alreadySeen })
        filtersBySearch?.save()
        
        res.status(200).json({ 
            msg: 'Búsqueda actualizada',
            searchEdited: search,
            filters: filtersBySearch
        })
    }
    catch (error) {
        await session.abortTransaction();
        return res.status(500).json({msg: 'Error en el servidor'})
    }
    finally {
        session.endSession()
    }
}