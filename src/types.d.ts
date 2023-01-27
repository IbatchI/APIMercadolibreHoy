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

export const enum TypesOfFilters {
    MIN_PRICE = 'MIN_PRICE',
    MAX_PRICE = 'MAX_PRICE',
    ALREADY_SEEN = 'ALREADY_SEEN',
}

export type TFilter = 
    | {type: TypesOfFilters.MIN_PRICE, value: number} 
    | {type: TypesOfFilters.MAX_PRICE , value: number} 
    | {type: TypesOfFilters.ALREADY_SEEN, value: boolean}