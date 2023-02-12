import { Response} from "express"

import { IGetFilterInfoRequest } from '../types'
import { Filter as FilterModel, Search } from "../models"

// Post Filter necesitamos enviarle el id de la busqueda a la que pertenece
export const saveFilterForSearch = async (req: IGetFilterInfoRequest, res: Response) => {
    const { filter: filterRequest, searchId } = req.body

    // get search
    const search = await Search.findById(searchId)

    // check if this filter is allready in the data base
    const filtersDB = await FilterModel.find({ search: searchId })
    const filterDBExists = filtersDB.find( filter => filter.filter.type === filterRequest.type )
    if (filterDBExists) {
        // update filter
        filterDBExists.filter = filterRequest
        await filterDBExists.save()
        return res.status(201).json({filter: filterDBExists, msg: 'Filtro actualizado'})
    }
 

    // data for filter
    const filterData = {
        filter: filterRequest,
        search
    }
    
    const filter = new FilterModel(filterData)
    await filter.save()

    return res.status(201).json({filter, msg: 'Filtro guardado'})
}

// Get all filters by search
export const getAllFiltersBySearch = async (req: IGetFilterInfoRequest, res: Response) => {
    const { searchId } = req.body
    
    const filtersBySeach = await FilterModel.find({ search: searchId })

    if(!filtersBySeach) {
        return res.status(400).json({msg: 'No se encontraron filtros'})
    }
    
    return res.status(200).json({filters: filtersBySeach})
}

// Update filter
export const updateFilter = async (req: IGetFilterInfoRequest, res: Response) => {
    const { filter } = req.body
    const { id } = req.params

    const filerDb = await FilterModel.findById(id)
    if(!filerDb) {
        return res.status(400).json({msg: 'No se encontro el filtro'})
    }

    filerDb.set(filter)
    await filerDb.save()

    res.json({ 
        msg: 'Filtro Actualizado',
        filter: filerDb,
    });
}

// Delete filter
export const deleteFilter = async (req: IGetFilterInfoRequest, res: Response) => {
    const { id } = req.params
    await FilterModel.findByIdAndDelete(id)
    res.status(200).json({msg: 'Filtro eliminado'})
}