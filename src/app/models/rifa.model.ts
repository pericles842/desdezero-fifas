export class Rifa {
    id: number = 0
    nombre: string = '';
    descripcion: string = '';
    url_img: string = '';
    fecha_fin: any
    precio: number = 1
    status: StatusRaffle = 'no_activa';
    objetivo_ventas: number = 10000
    participantes: number = 0
    fondos_recaudados: number | null = 0
    ver_fecha: boolean = false
    ver_participantes: boolean = false
    ver_ganador: boolean = false
    ver_tickets: boolean = false

    constructor() {

    }
}

export type StatusRaffle = 'activa' | 'no_activa'

export class winUser {
    id: number = 0
    nombre: string = ""
    telefono: string = ""
    tike_ganador: number = 0
    nombre_rifa: string = ""
    fecha: Date = new Date
}