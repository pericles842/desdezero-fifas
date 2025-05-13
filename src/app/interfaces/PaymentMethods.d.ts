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


export interface Payment {
    id: number,
    total: number,
    total_bs: number,
    tasa: string,
    comprobante: string,
    status: 'aprobado' | 'pendiente' | 'rechazado',
    cantidad_tickets: number,
    id_usuario: number,
    id_metodo_pago: number,
    id_rifa: number,
    fecha: string,
    nombre: string,
    telefono: string
}
