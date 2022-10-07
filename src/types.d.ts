import { Request } from "express"
import { IUser } from "./models/user"

export interface IGetUserAuthInfoRequest extends Request {
    user?: IUser
    uid?: string
}