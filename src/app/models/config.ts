export class ConfigResponse {
    config: Config;
    estadisticas: Estadisticas;

    constructor() {
        this.config = new Config();
        this.estadisticas = new Estadisticas();
    }
}
export class Config {
    id: number = 0;
    tasa_banco: TypeDolar = 'promedio';
    tasa_personalizada: number = 0;
    telefono: string = '';
    correo: string = '';
    tasa_automatica: number = 0;
    estadisticas: number = 0;
    createdAt: Date = new Date();
}

export class Estadisticas {
    participantes: number = 0;
    tikes_vendidos: number = 0
    rifas_activas: number = 0;
    tikes_vendidos_rifa: number = 0;
    porcentaje_venta: number = 0
}


export type TypeDolar = 'paralelo' | 'bcv' | 'promedio'