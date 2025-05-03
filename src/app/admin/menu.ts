import { Menu } from "../interfaces/menu";

export const MENU: Menu[] = [
    {
        id: 1,
        name: "Estadísticas",
        active: true,
        icon: 'fa-solid fa-chart-simple ',
        rute: ''
    },
    {
        id: 2,
        name: "Configuración",
        active: false,
        icon: 'fa-solid fa-gear ',
        rute: ''
    },
    {
        id: 3,
        name: "Rifas",
        active: false,
        icon: 'fa-solid fa-trophy ',
        rute: '/dashboard/crear-rifas'
    },
    {
        id: 4,
        name: "Pagos",
        active: false,
        icon: 'fa-solid fa-money-bills ',
        rute: ''
    },
    {
        id: 5,
        name: "Métodos de pago",
        active: false,
        icon: 'fa-solid fa-credit-card ',
        rute: ''
    }
]