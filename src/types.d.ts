import { Request } from "express"
import { IUser, ISearch } from "./models"

export interface IGetUserAuthInfoRequest extends Request {
    user?: IUser
    uid?: string
}

export interface IGetSearchInfoRequest extends Request {
    searchBody?: ISearch
    searchId?: string
}