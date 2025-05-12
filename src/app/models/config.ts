export class Config {
    id: number = 0;
    tasa_banco: TypeDolar = 'paralelo';
    tasa_personalizada: number = 0;
    telefono: number = 0;
    correo: string = '';
    estadisticas: boolean = false





}

export type TypeDolar = 'paralelo' | 'bcv' | 'promedio'