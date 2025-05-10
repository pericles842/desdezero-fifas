import { TemplateRef } from "@angular/core";
import { TypePay } from "../models/pay_method";



export interface CategoryPay {
    id: number,
    name: string,
    key_template?: TemplateRef<any>,
    key: TypePay,
    active: boolean
}

export interface DollarOficial {
    id: number,
    title: string,
    imgUrl: string
    price: string
}