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
    correo: string,
    referencia: string,
    nombre: string,
    telefono: string
}

export class Sales {
    id: number = 0
    usuario: string = ''
    telefono: string = ''
    correo: string = ''
    referencia: string = ''
    comprobante: string = ''
    cantidad_tickets: number = 0
    estatus: 'aprobado' | 'pendiente' | 'rechazado' = 'pendiente'
    total: number = 0
    total_bs: number = 0
    metodo_pago: string = ''
    tipo: TypePay = 'pagomovil'
    fecha: string = ''
    tasa: string = ''
    rifa: string = ''
    tikes: any = ''
    active?: boolean = true

    constructor(data: Partial<Sales> = {}) {
        Object.assign(this, data);
    }
}
