import { Response, Request } from "express";
import bcrypt from 'bcrypt'

import User from "../models/user";
import { IGetUserAuthInfoRequest } from "../types";

export const usersGet = (req: Request, res: Response) => {
    res.json({
        msg: 'get API - controlador'
    });
}

export const usersPost = async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    const user = new User({ name, email, password })
    
    // Encrypt password
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    // Save user in DB
    await user.save()

    res.json({ 
        message: 'Usuario creado',
        user 
    });
}

export const userPut = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { id } = req.params
    const { _id, password, google, email, ...rest } = req.body
    if(password) {
        // Encrypt password
        const salt = bcrypt.genSaltSync()
        rest.password = bcrypt.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, rest)

    res.json({ 
        message: 'Usuario actualizado',
        userEdited: user,
        userLogued: req.user
    });
}

export const userDelete = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { id } = req.params
    const user = await User.findByIdAndUpdate(id, { state: false })

    res.json({ 
        message: 'Usuario eliminado',
        userDeleted: user,
        userLogued: req.user 
    });
}