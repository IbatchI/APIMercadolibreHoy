import { Request } from "express"
import { IUser, ISearch } from "./models"
import { IFilter } from './models/filter';

export interface IGetUserAuthInfoRequest extends Request {
    user?: IUser
    uid?: string
}

export interface IGetSearchInfoRequest extends Request {
    searchBody?: ISearch
    searchId?: string
}
export interface IGetFilterInfoRequest extends Request {
    filter?: IFilter
    searchId?: string
}

export type TFilter = {
    'minPrice': number;
    'maxPrice': number;
    'alreadySeen': boolean;
}
   