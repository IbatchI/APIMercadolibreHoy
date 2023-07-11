import { Response} from "express"

import { IGetFilterInfoRequest } from '../types'
import { Filter, Search } from "../models"
import { ISearch } from '../models/search';

// Post Filter necesitamos enviarle el id de la busqueda a la que pertenece
export const saveFilterForSearch = async (req: IGetFilterInfoRequest, res: Response) => {
    const { 
        minPrice,
        maxPrice,
        alreadySeen,
        searchId,
        keyword
    } = req.body

    // get search
    const search = await Search.findById(searchId)
    
    if(!search) {
        return res.status(400).json({msg: 'No se encontro la busqueda'})
    } else {
        if(keyword) search.set({ keyword })
        await search.save()
        const filter = new Filter({ minPrice, maxPrice, alreadySeen, search: searchId })
        await filter.save()
        return res.status(201).json({ filter, msg: 'Filtro guardado' })

    }
}

export const getFiltersBySearch = async ({ search }: {search: ISearch}) => await Filter.findOne({ search })

// Get all filters by search
export const getAllFiltersBySearch = async (req: IGetFilterInfoRequest, res: Response) => {
    const { id } = req.params
    
    const search = await Search.findById(id)
    // @ts-ignore
    const filtersBySeach = await getFiltersBySearch({ search})

    if(!filtersBySeach) {
        return res.status(400).json({msg: 'No se encontraron filtros'})
    }
    
    return res.status(200).json({ filters: filtersBySeach })
}

// Update filter
export const updateFilter = async (req: IGetFilterInfoRequest, res: Response) => {
    const { filters } = req.body
    const { id } = req.params

    const filerDb = await Filter.findById(id)
    if(!filerDb) {
        return res.status(400).json({msg: 'No se encontro el filtro'})
    }

    filerDb.set(filters)
    await filerDb.save()

    res.json({ 
        msg: 'Filtro Actualizado',
        filter: filerDb,
    });
}

// Delete filter
export const deleteFilter = async (req: IGetFilterInfoRequest, res: Response) => {
    const { id } = req.params
    await Filter.findByIdAndDelete(id)
    res.status(200).json({msg: 'Filtro eliminado'})
}