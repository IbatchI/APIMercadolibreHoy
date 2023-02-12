import {Filter, Search, User} from "../src/models"
import { TFilter, TypesOfFilters } from "../src/types"

// Email validation
export const emailIsAlreadyRegistered = async (email = '') => {
    const emailExists = await User.findOne({ email })
    if (emailExists) {
        throw new Error(`El correo ${email} ya está registrado`)
    }
}

export const userExistsById = async (id = '') => {
    const userExists = await User.findById(id)
    if (!userExists) {
        throw new Error(`El id ${id} no existe`)
    }
}

export const searchExistsById = async (id = '') => {
    const searchExists = await Search.findById(id)
    if (!searchExists) {
        throw new Error(`El id ${id} no existe`)
    }
}

// Filters validation of custom type TFilter
export const isAValidFilter = async (filter: TFilter) => {
    const { type, value } = filter
    let isValid = false
    switch (type) {
        case TypesOfFilters.MIN_PRICE:
            isValid = typeof value === 'number'
            break;
        case TypesOfFilters.MAX_PRICE:
            isValid = typeof value === 'number'
            break;
        case TypesOfFilters.ALREADY_SEEN:
            isValid = typeof value === 'boolean'
            break;
        default:
            break;
    }
    
    if (!isValid) {
        throw new Error(`El filtro ${type} no es válido`)
    }
}

// Filter exists by id
export const filterExistsById = async (id = '') => {
    const filterExist = await Filter.findById(id)
    if (!filterExist) {
        throw new Error(`El id ${id} no existe`)
    }
}