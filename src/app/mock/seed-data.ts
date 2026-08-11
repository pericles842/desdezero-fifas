import { Config } from '../models/config';
import { PayMethod } from '../models/pay_method';
import { Awards, Rifa, winUser } from '../models/rifa.model';
import { TasasDesdezero } from '../interfaces/RatesDesdezero';
import { SaleRecord, MockCounters } from './mock-types';

const RIFA_IMG = 'assets/img/rifa.jpg';
const RECIBO_IMG = 'assets/img/rifa.jpg';
const AWARD_IMG = 'assets/img/rifa.jpg';

function inDays(days: number): string {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 16);
}

export function seedRifas(): Rifa[] {
    return [
        {
            id: 1,
            nombre: 'iPhone 16 Pro Max 256GB',
            descripcion: 'Participa y llévate un iPhone 16 Pro Max completamente nuevo, sellado de fábrica.',
            url_img: RIFA_IMG,
            fecha_fin: inDays(21),
            precio: 3,
            status: 'activa',
            objetivo_ventas: 500,
            participantes: 128,
            fondos_recaudados: 612,
            ver_fecha: true,
            ver_participantes: true,
            ver_ganador: true,
            ver_tickets: true,
        },
        {
            id: 2,
            nombre: 'PlayStation 5 + 2 controles',
            descripcion: 'Consola PS5 edición estándar con dos controles inalámbricos.',
            url_img: RIFA_IMG,
            fecha_fin: inDays(-5),
            precio: 2,
            status: 'no_activa',
            objetivo_ventas: 300,
            participantes: 300,
            fondos_recaudados: 600,
            ver_fecha: true,
            ver_participantes: true,
            ver_ganador: true,
            ver_tickets: true,
        },
    ];
}

export function seedAwards(): Awards[] {
    return [
        {
            id: 1,
            nombre_rifa: 'PlayStation 5 + 2 controles',
            nombre_ganador: 'Carlos Pérez',
            tike_ganador: '482',
            url: AWARD_IMG,
            fecha: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
    ];
}

export function seedWinner(): winUser {
    return {
        id: 1,
        nombre: 'Carlos Pérez',
        telefono: '04141234567',
        tike_ganador: 482,
        nombre_rifa: 'PlayStation 5 + 2 controles',
        fecha: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    };
}

export function seedPayMethods(): PayMethod[] {
    return [
        new PayMethod(1, 'pagomovil', 'Pago Móvil', 'Desdezero C.A.', 1, 'assets/img/bancos/pago-movil.png', {
            type_person: 'Persona Jurídica',
            banco: 'Banesco',
            ci: 'J-40123456-9',
            codigo_banco: '0134',
            telefono: '04141234567',
        }),
        new PayMethod(2, 'transferencia', 'Transferencia', 'Desdezero C.A.', 5, 'assets/img/logo-negativo.png', {
            type_person: 'Persona Jurídica',
            cuenta: 'Corriente',
            banco: 'Banco de Venezuela',
            nro_cuenta: '0102-0123-45-6789012345',
            ci: 'J-40123456-9',
        }),
        new PayMethod(3, 'billeteradigital', 'Zelle', 'Desdezero LLC', 3, 'assets/img/bancos/zelle.png', {
            correo: 'pagos@desdezero.com',
            type_person: 'Persona Jurídica',
        }),
        new PayMethod(4, 'billeteradigital', 'Zinli', 'Desdezero C.A.', 3, 'assets/img/bancos/zinli.png', {
            correo: 'pagos@desdezero.com',
            type_person: 'Persona Jurídica',
        }),
    ];
}

export function seedConfig(): Config {
    return {
        id: 1,
        tasa_banco: 'promedio',
        tasa_personalizada: 40,
        telefono: '04140000000',
        correo: 'contacto@desdezero.com',
        tasa_automatica: 1,
        estadisticas: 1,
        createdAt: new Date(),
    };
}

export function seedTasas(): TasasDesdezero[] {
    const today = new Date().toLocaleDateString('es-VE');
    return [
        { id: 1, title: 'BCV', key: 'bcv', img_url: 'assets/img/foto-tasa.png', price: 36.52, price_old: 36.1, last_update: today },
        { id: 2, title: 'Paralelo', key: 'paralelo', img_url: 'assets/img/foto-tasa.png', price: 41.85, price_old: 41.2, last_update: today },
        { id: 3, title: 'Promedio', key: 'promedio', img_url: 'assets/img/foto-tasa.png', price: 39.18, price_old: 38.65, last_update: today },
    ];
}

function saleDate(daysAgo: number): string {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString();
}

export function seedSales(): SaleRecord[] {
    return [
        {
            id: 1,
            id_rifa: 1,
            id_metodo_pago: 1,
            nombre: 'María Rodríguez',
            telefono: '04141112233',
            correo: 'maria.rodriguez@example.com',
            referencia: '000123456',
            comprobante: RECIBO_IMG,
            cantidad_tickets: 5,
            estatus: 'aprobado',
            total: 15,
            total_bs: 15 * 39.18,
            metodo_pago: 'Pago Móvil Banesco',
            tipo: 'pagomovil',
            fecha: saleDate(2),
            tasa: '39.18',
            rifa: 'iPhone 16 Pro Max 256GB',
            tikes: '1,2,3,4,5',
        },
        {
            id: 2,
            id_rifa: 1,
            id_metodo_pago: 3,
            nombre: 'José Gómez',
            telefono: '04241234567',
            correo: 'jose.gomez@example.com',
            referencia: 'ZL-998877',
            comprobante: RECIBO_IMG,
            cantidad_tickets: 3,
            estatus: 'pendiente',
            total: 9,
            total_bs: 9 * 39.18,
            metodo_pago: 'Zelle',
            tipo: 'billeteradigital',
            fecha: saleDate(1),
            tasa: '39.18',
            rifa: 'iPhone 16 Pro Max 256GB',
            tikes: '6,7,8',
        },
        {
            id: 3,
            id_rifa: 1,
            id_metodo_pago: 2,
            nombre: 'Ana Torres',
            telefono: '04161239876',
            correo: 'ana.torres@example.com',
            referencia: '445566778',
            comprobante: RECIBO_IMG,
            cantidad_tickets: 2,
            estatus: 'rechazado',
            total: 6,
            total_bs: 6 * 39.18,
            metodo_pago: 'Transferencia Nacional',
            tipo: 'transferencia',
            fecha: saleDate(3),
            tasa: '39.18',
            rifa: 'iPhone 16 Pro Max 256GB',
            tikes: '9,10',
        },
        {
            id: 4,
            id_rifa: 2,
            id_metodo_pago: 1,
            nombre: 'Carlos Pérez',
            telefono: '04141234567',
            correo: 'carlos.perez@example.com',
            referencia: '000998877',
            comprobante: RECIBO_IMG,
            cantidad_tickets: 4,
            estatus: 'aprobado',
            total: 8,
            total_bs: 8 * 38.65,
            metodo_pago: 'Pago Móvil Banesco',
            tipo: 'pagomovil',
            fecha: saleDate(6),
            tasa: '38.65',
            rifa: 'PlayStation 5 + 2 controles',
            tikes: '480,481,482,483',
        },
    ];
}

export function seedCounters(): MockCounters {
    return { rifa: 2, award: 1, payMethod: 4, sale: 4, winner: 1, ticket: 10 };
}
