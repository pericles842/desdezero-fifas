import { PayMethod } from "./pay_method";

export class User {
    id: number = 0;
    nombre: string = '';
    cod_num: string = '+58';
    correo: string = '';
    confirm_correo: string = ''
    confirm_telefono: string = ''
    referencia: string = '';
    total: number = 0;
    total_bs: number = 0
    tasa: string = ''
    telefono: string = '';
    comprobante: string = ''
    password?: string = '';
    cantidad_tickets: number = 1
    status: 'aprobado' | 'pendiente' | 'rechazado' = 'pendiente'
    detalle_metodo_pago: PayMethod = new PayMethod()
    creado_en: string = new Date().toLocaleDateString()
}