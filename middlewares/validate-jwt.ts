import { NextFunction, Response } from "express"
import jwt from 'jsonwebtoken';

import { IGetUserAuthInfoRequest } from "../src/types";
import { User } from "../src/models";

export const validateJWT = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    // read token
    const token = req.header('x-token')
    if(!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }
    try {
        const { uid } = jwt.verify(
            token,
            process.env.SECRETORPRIVATEKEY || ''
        ) as IGetUserAuthInfoRequest

        const userFinded = await User.findById(uid)
        if(!userFinded) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en DB'
            })
        }
        if(!userFinded.state) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }

        req.user = userFinded || undefined
        
        next()
    } catch (error) {
        return res.status(401).json({
            msg: 'Token no válido'
        })
    }
}