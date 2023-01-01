import { Response} from "express"

import { IGetSearchInfoRequest } from '../types'
import { Filter, Search } from "../models"

// Post Filter necesitamos enviarle el id de la busqueda a la que pertenece
export const saveFilterForSearch = async (req: IGetSearchInfoRequest, res: Response) => {
    const { name, value, searchId } = req.body

    // Check if filter already exists
    const nameBD = await Filter.findOne({ name })

    if(nameBD) {
        return res.status(400).json({
            msg: 'El filtro ya existe'
        })
    }

    // get search
    const search = await Search.findById(searchId)

    // data to save
    const data = {
        name,
        value,
        search
    }
    const filter = new Filter(data)
    await filter.save()

    return res.status(201).json(filter)
}
