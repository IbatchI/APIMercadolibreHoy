import User from "../src/models/user"

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