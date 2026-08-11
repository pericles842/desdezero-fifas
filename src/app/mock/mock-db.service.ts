import { Injectable } from '@angular/core';
import { Config, Estadisticas } from '../models/config';
import { PayMethod } from '../models/pay_method';
import { Awards, Rifa, winUser } from '../models/rifa.model';
import { TasasDesdezero } from '../interfaces/RatesDesdezero';
import { Statistics } from '../interfaces/Statistics';
import { TopUser } from '../interfaces/top';
import { MockCounters, SaleRecord } from './mock-types';
import {
    seedAwards,
    seedConfig,
    seedCounters,
    seedPayMethods,
    seedRifas,
    seedSales,
    seedTasas,
    seedWinner,
} from './seed-data';

interface MockDb {
    rifas: Rifa[];
    awards: Awards[];
    payMethods: PayMethod[];
    sales: SaleRecord[];
    winner: winUser | null;
    config: Config;
    tasas: TasasDesdezero[];
    counters: MockCounters;
}

const STORAGE_KEY = 'desdezero_demo_db_v1';

/**
 * Base de datos local en memoria (persistida en localStorage) que sustituye
 * al backend real para el demo. Todos los servicios HTTP originales
 * (RifasService, PayService, UserService) leen y escriben aquí en vez de
 * hacer peticiones de red.
 */
@Injectable({
    providedIn: 'root',
})
export class MockDbService {
    private db!: MockDb;

    constructor() {
        this.load();
    }

    private buildSeed(): MockDb {
        return {
            rifas: seedRifas(),
            awards: seedAwards(),
            payMethods: seedPayMethods(),
            sales: seedSales(),
            winner: seedWinner(),
            config: seedConfig(),
            tasas: seedTasas(),
            counters: seedCounters(),
        };
    }

    private load(): void {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            this.db = raw ? (JSON.parse(raw) as MockDb) : this.buildSeed();
        } catch {
            this.db = this.buildSeed();
        }
    }

    private persist(): void {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.db));
        } catch {
            // localStorage lleno o no disponible: continuamos solo en memoria
        }
    }

    reset(): void {
        this.db = this.buildSeed();
        this.persist();
    }

    private clone<T>(value: T): T {
        return JSON.parse(JSON.stringify(value));
    }

    // ---------- Rifas ----------

    listRifas(): Rifa[] {
        return this.clone(this.db.rifas);
    }

    upsertRifa(rifa: Rifa): Rifa {
        if (!rifa.id) {
            this.db.counters.rifa += 1;
            rifa = { ...rifa, id: this.db.counters.rifa };
            this.db.rifas.push(rifa);
        } else {
            const index = this.db.rifas.findIndex((r) => r.id === rifa.id);
            if (index >= 0) this.db.rifas[index] = rifa;
        }
        this.persist();
        return this.clone(rifa);
    }

    deleteRifa(id: number): void {
        this.db.rifas = this.db.rifas.filter((r) => r.id !== id);
        this.persist();
    }

    setActiveRifa(id: number): Rifa | undefined {
        this.db.rifas = this.db.rifas.map((r) => ({ ...r, status: r.id === id ? 'activa' : 'no_activa' }));
        this.persist();
        return this.clone(this.db.rifas.find((r) => r.id === id));
    }

    deactivateRifa(id: number): Rifa | undefined {
        const rifa = this.db.rifas.find((r) => r.id === id);
        if (rifa) rifa.status = 'no_activa';
        this.persist();
        return this.clone(rifa);
    }

    getActiveRifa(): Rifa | undefined {
        const rifa = this.db.rifas.find((r) => r.status === 'activa');
        return rifa ? this.clone(rifa) : undefined;
    }

    // ---------- Awards ----------

    listAwards(): Awards[] {
        return this.clone(this.db.awards);
    }

    upsertAward(award: Awards): Awards {
        if (!award.id) {
            this.db.counters.award += 1;
            award = { ...award, id: this.db.counters.award };
            this.db.awards.push(award);
        } else {
            const index = this.db.awards.findIndex((a) => a.id === award.id);
            if (index >= 0) this.db.awards[index] = award;
        }
        this.persist();
        return this.clone(award);
    }

    deleteAward(id: number): void {
        this.db.awards = this.db.awards.filter((a) => a.id !== id);
        this.persist();
    }

    // ---------- Pay methods ----------

    listPayMethods(): PayMethod[] {
        return this.clone(this.db.payMethods);
    }

    upsertPayMethod(pay: PayMethod): PayMethod {
        if (!pay.id) {
            this.db.counters.payMethod += 1;
            pay = { ...pay, id: this.db.counters.payMethod };
            this.db.payMethods.push(pay);
        } else {
            const index = this.db.payMethods.findIndex((p) => p.id === pay.id);
            if (index >= 0) this.db.payMethods[index] = pay;
        }
        this.persist();
        return this.clone(pay);
    }

    deletePayMethod(id: number): void {
        this.db.payMethods = this.db.payMethods.filter((p) => p.id !== id);
        this.persist();
    }

    // ---------- Winner ----------

    getWinner(): winUser | null {
        return this.db.winner ? this.clone(this.db.winner) : null;
    }

    setWinner(nombre: string, telefono: string, tikeGanador: string, nombreRifa: string): winUser {
        this.db.counters.winner += 1;
        const winner: winUser = {
            id: this.db.counters.winner,
            nombre,
            telefono,
            tike_ganador: Number(tikeGanador),
            nombre_rifa: nombreRifa,
            fecha: new Date(),
        };
        this.db.winner = winner;
        this.persist();
        return this.clone(winner);
    }

    deleteWinner(): void {
        this.db.winner = null;
        this.persist();
    }

    // ---------- Config ----------

    getConfig(): Config {
        return this.clone(this.db.config);
    }

    setConfig(config: Config): Config {
        this.db.config = { ...config, id: this.db.config.id || 1 };
        this.persist();
        return this.clone(this.db.config);
    }

    // ---------- Tasas ----------

    listTasas(): TasasDesdezero[] {
        return this.clone(this.db.tasas);
    }

    // ---------- Sales ----------

    listSales(): SaleRecord[] {
        return this.clone(this.db.sales);
    }

    getSale(id: number): SaleRecord | undefined {
        const sale = this.db.sales.find((s) => s.id === id);
        return sale ? this.clone(sale) : undefined;
    }

    addSale(record: Omit<SaleRecord, 'id'>): SaleRecord {
        this.db.counters.sale += 1;
        const sale: SaleRecord = { ...record, id: this.db.counters.sale };
        this.db.sales.push(sale);
        this.persist();
        return this.clone(sale);
    }

    updateSaleStatus(id: number, estatus: SaleRecord['estatus']): SaleRecord | undefined {
        const sale = this.db.sales.find((s) => s.id === id);
        if (sale) sale.estatus = estatus;
        this.persist();
        return sale ? this.clone(sale) : undefined;
    }

    reserveTicketNumbers(count: number): number[] {
        const numbers: number[] = [];
        for (let i = 0; i < count; i++) {
            this.db.counters.ticket += 1;
            numbers.push(this.db.counters.ticket);
        }
        this.persist();
        return numbers;
    }

    // ---------- Derivados / estadísticas ----------

    computeEstadisticas(): Estadisticas {
        const activa = this.db.rifas.find((r) => r.status === 'activa');
        const aprobadas = this.db.sales.filter((s) => s.estatus === 'aprobado');

        const participantes = new Set(aprobadas.map((s) => s.correo)).size;
        const tikes_vendidos = aprobadas.reduce((acc, s) => acc + s.cantidad_tickets, 0);
        const rifas_activas = this.db.rifas.filter((r) => r.status === 'activa').length;
        const tikes_vendidos_rifa = activa
            ? aprobadas.filter((s) => s.id_rifa === activa.id).reduce((acc, s) => acc + s.cantidad_tickets, 0)
            : 0;
        const porcentaje_venta = activa && activa.objetivo_ventas > 0 ? (tikes_vendidos_rifa / activa.objetivo_ventas) * 100 : 0;

        return {
            participantes,
            tikes_vendidos,
            rifas_activas,
            tikes_vendidos_rifa,
            porcentaje_venta,
        };
    }

    computeAdminStatistics(): Statistics[] {
        const est = this.computeEstadisticas();
        const aprobadas = this.db.sales.filter((s) => s.estatus === 'aprobado');
        const pendientes = this.db.sales.filter((s) => s.estatus === 'pendiente').length;
        const fondosRecaudados = aprobadas.reduce((acc, s) => acc + s.total, 0);

        return [
            { id: 1, title: 'Participantes', statistic: est.participantes, icon: 'fa-solid fa-users', col: 'md:col-4' },
            { id: 2, title: 'Tickets Vendidos', statistic: est.tikes_vendidos, icon: 'fa-solid fa-ticket', col: 'md:col-4' },
            { id: 3, title: 'Rifas Activas', statistic: est.rifas_activas, icon: 'fa-solid fa-trophy', col: 'md:col-4' },
            { id: 4, title: 'Fondos Recaudados', statistic: `${fondosRecaudados.toFixed(2)}$`, icon: 'fa-solid fa-sack-dollar', col: 'md:col-6' },
            { id: 5, title: 'Ventas Pendientes', statistic: pendientes, icon: 'fa-solid fa-clock', col: 'md:col-6' },
        ];
    }

    computeTopUsers(): TopUser[] {
        const aprobadas = this.db.sales.filter((s) => s.estatus === 'aprobado');
        const map = new Map<string, TopUser>();

        for (const s of aprobadas) {
            const existing = map.get(s.correo);
            if (existing) {
                existing.total_tickets += s.cantidad_tickets;
            } else {
                map.set(s.correo, { nombre: s.nombre, correo: s.correo, telefono: s.telefono, total_tickets: s.cantidad_tickets });
            }
        }

        return Array.from(map.values())
            .sort((a, b) => b.total_tickets - a.total_tickets)
            .slice(0, 5);
    }
}
