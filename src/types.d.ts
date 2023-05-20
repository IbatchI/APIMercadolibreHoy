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
   
interface IProduct {
    id: string
    permalink: string
    title: string
    price: number
    pictures: string[]
    description: string
}

interface IPicture {
    id
    url
    secure_url
    size
    max_size
    quality
}