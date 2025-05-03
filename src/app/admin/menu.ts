import { Menu } from "../interfaces/menu";

export const MENU: Menu[] = [
    {
        id: 1,
        name: "Estadísticas",
        active: true,
        icon: 'fa-solid fa-chart-simple ',
        rute: '/admin/estadisticas'
    },
    {
        id: 2,
        name: "Configuración",
        active: false,
        icon: 'fa-solid fa-gear ',
        rute: '/admin/configuracion'
    },
    {
        id: 3,
        name: "Rifas",
        active: false,
        icon: 'fa-solid fa-trophy ',
        rute: '/admin/rifas'
    },
    {
        id: 4,
        name: "Venta",
        active: false,
        icon: 'fa-solid fa-money-bills ',
        rute: ''
    },
    {
        id: 5,
        name: "Métodos de pago",
        active: false,
        icon: 'fa-solid fa-credit-card ',
        rute: '/admin/metodos-pagos'
    }
]