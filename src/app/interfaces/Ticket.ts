export class Ticket {
    id: number = 0;
    nombre: string = '';
    telefono: string = '';
    correo: string = '';
    referencia: string = '';
    id_metodo_pago: number = 0;
    id_rifa: number = 0;
    total: number = 0;
    cantidad_tickets: number = 0;
    total_bs: number = 0;
    tasa: string = '';
    comprobante: string = '';
    estatus: 'aprobado' | 'pendiente' | 'rechazado' = 'pendiente';
    fecha: string = '';  
    metodo_pago: string = '';
    rifa: string = '';
    tike: number = 0;
}