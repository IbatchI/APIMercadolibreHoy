import axios from "axios"

export const API_URL = 'https://api.mercadolibre.com'
export const LIMIT = 50

export const API_ML = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
      },
})