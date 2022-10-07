import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import User from "../models/user"
import { createJWT } from "../../helpers/generar-jwt"

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    
    try {
        // Verificar si el email existe
        const usuario = await User.findOne({ email })
        if(!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos - email'
            })
        }

        // Verificar si el usuario está activo
        if(!usuario.state) {
            return res.status(400).json({
                msg: 'El ususaio no está activo'
            })
        }

        // Verificar la contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password)
        if(!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos - password'
            })
        }

        // Generar el JWT
        const token = await createJWT(usuario.id)

        res.json({
            msg: 'Logueado correctamente',
            token,
            usuario
        })
    } catch(error) {
        return res.status(500).json({
            message: 'Hable con el administrador'
        })
    }
}