export interface Ticket {
    id: string;
    title: string;
    name: string;
    email: string;
    date: string;
    phone:number;
    status: 'aprobado' | 'pendiente';
}