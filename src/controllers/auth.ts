import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import User from "../models/user"
import { createJWT } from "../../helpers/generar-jwt"
import { googleVerify } from "../../helpers/google-verify"

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    
    try {
        // Verificar si el email existe
        const user = await User.findOne({ email })
        if(!user) {
            return res.status(400).json({
                msg: 'Credenciales inválidas'
            })
        }

        // Verificar si el usuario está activo
        if(!user.state) {
            return res.status(400).json({
                msg: 'El usuario no existe'
            })
        }

        // Verificar la contraseña
        const validPassword = bcrypt.compareSync(password, user.password)
        if(!validPassword) {
            return res.status(400).json({
                msg: 'Credenciales inválidas'
            })
        }

        // Generar el JWT
        const token = await createJWT(user.id)

        res.json({
            msg: 'Logueado correctamente',
            token,
            user
        })
    } catch(error) {
        return res.status(500).json({
            message: 'Hable con el administrador'
        })
    }
}

export const googleSignIn = async (req: Request, res: Response) => {
    const { id_token } = req.body

    try {
        const { name, email, picture } = await googleVerify(id_token)
        let user = await User.findOne({ email })
        if(!user) {
            // create user
            const data = {
                name,
                email,
                password: ':P',
                img: picture,
                google: true
            }
            user = new User(data)
            await user.save()
        }

        // if user is not active
        if(!user.state) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        // generate JWT
        const token = await createJWT(user.id)

    res.json({
        msg: 'Google SignIn',
        user,
        token
    })
    } catch(error) {
        res.status(400).json({
            msg: 'Token de Google no es válido'
        })
    }
}