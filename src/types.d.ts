import { Request } from "express"
import { IUser } from "./models/user"
import { ISearch} from "./models/search"

export interface IGetUserAuthInfoRequest extends Request {
    user?: IUser
    uid?: string
}

export interface IGetSearchInfoRequest extends Request {
    searchId?: string
}