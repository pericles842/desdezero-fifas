export class Rifa {
    id: number = 0
    nombre: string = '';
    descripcion: string = '';
    url_img: string = '';
    fecha_fin: Date = new Date();
    precio: number = 1
    status: StatusRaffle = 'activa';
    objetivo_ventas: number = 10000
    participantes: number | null = 0
    fondos_recaudados: number | null = 0
    ver_fecha: boolean = false
    ver_participantes: boolean = false
    ver_ganador: boolean = false
    ver_tickets: boolean = false

    constructor(data: Partial<Rifa> = {}) {
        Object.assign(this, data);
    }
}

export type StatusRaffle = 'activa' | 'no_activa'