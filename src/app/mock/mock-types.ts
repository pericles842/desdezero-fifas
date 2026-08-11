import { TypePay } from '../models/pay_method';

/**
 * Registro interno de venta/ticket. Es un superconjunto de los campos que
 * necesitan tanto `Sales` (vista admin) como `Ticket` (vista pública de
 * búsqueda de tickets), para poder derivar ambas formas desde una sola fuente.
 */
export interface SaleRecord {
    id: number;
    id_rifa: number;
    id_metodo_pago: number;
    nombre: string;
    telefono: string;
    correo: string;
    referencia: string;
    comprobante: string;
    cantidad_tickets: number;
    estatus: 'aprobado' | 'pendiente' | 'rechazado';
    total: number;
    total_bs: number;
    metodo_pago: string;
    tipo: TypePay;
    fecha: string;
    tasa: string;
    rifa: string;
    tikes: string;
}

export interface MockCounters {
    rifa: number;
    award: number;
    payMethod: number;
    sale: number;
    winner: number;
    ticket: number;
}
