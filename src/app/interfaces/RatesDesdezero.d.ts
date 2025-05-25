import { TypeDolar } from "../models/config"

export interface TasasDesdezero {
    id: number
    title: string
    key: TypeDolar 
    img_url: string
    price: number
    price_old: number
    last_update: string
}