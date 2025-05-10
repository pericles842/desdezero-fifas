export class PayMethod {
    id: number = 0
    tipo: TypePay = 'pagomovil'
    nombre: string = ''
    titular: string = ''
    min_tickets: number = 1
    url_img: string = ''
    datos: any = ''

    constructor(id: number = 0,
        tipo: TypePay = 'pagomovil',
        nombre: string = '',
        titular: string = '',
        min_tickets: number = 1,
        url_img: string = '',
        datos: any = {}) {
        this.id = id;
        this.tipo = tipo;
        this.nombre = nombre;
        this.titular = titular;
        this.min_tickets = min_tickets;
        this.url_img = url_img;
        this.datos = datos;
    }

}


export type TypePay = 'pagomovil' | 'transferencia' | 'billeteradigital' 