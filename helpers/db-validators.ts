import { Filter, Search, User } from "../src/models"

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
    if (searchExists === null) {
        throw new Error(`El id ${id} no existe`)
    }
}

// // Filters validation of custom type TFilter
// export const isAValidFilter = async (filters: TFilter) => {
//     // TODO: mejorar la validación, ver si tiene las 3 keys { minPrice, maxPrice, alreadySeen }
//     if (filters.minPrice && filters.maxPrice && filters.alreadySeen) {
//         return
//     }
//     throw new Error(`El filtro no es válido`)
// }

// Filter exists by id
export const filterExistsById = async (id = '') => {
    const filterExist = await Filter.findById(id)
    if (!filterExist) {
        throw new Error(`El id ${id} no existe`)
    }
}