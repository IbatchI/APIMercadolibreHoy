import {Publication, Search, User} from "../src/models"

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

export const publicationExistsById = async (id = '') => {
    const publicationExists = await Publication.findById(id)
    if (!publicationExists) {
        throw new Error(`El id ${id} no existe`)
    }
}

// Filters
const validsNamesOfFilters = [
    'RANGE_PRICE'
]

export const isNameValid = async (name = '') => {
    const existsName = await validsNamesOfFilters.includes(name);
    if ( !existsName ) {
        throw new Error(`El filtro ${ name } no es valido`);
    }
}