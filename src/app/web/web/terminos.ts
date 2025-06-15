import { Awards } from "src/app/models/rifa.model";

export const contract = `
<div style="display: flex; flex-direction: column; justify-content: start; gap: 20px;">
    <p style="text-align: justify;">1- Los tickets serán enviados en un lapso de 24 horas.
        Tenemos un alto volumen de pagos por procesar. </p>

    <p style="text-align: justify;">2- Solo podrán participar en nuestros sorteos personas naturales mayores de 18 años.
        (se puede hacer una exception bajo el consentimiento de los padres )</p>

    <p style="text-align: justify;">3- Las Entregas se programan en el transcurso de la semana a traves 
    de WhatsApp o llamada Telefonica lo Más Pronto Posible.</p>

    <p style="text-align: justify;">4- Los tickets serán asignados de manera aleatoria y los recibirás a través del correo proporcionado.
    </p>

    <p style="text-align: justify;">5- Los ganadores aceptan aparecer en el contenido audiovisual del sorteo mostrando su presencia en las redes y
        entrega de los premios. Esto es OBLIGATORIO.</p>

    <p style="text-align: justify;">6- Al realizar la compra estás aceptando todos los términos y condiciones.</p>
</div>
`;

export const PREMIOS_ENTREGADOS: Awards[] = [
    {
        id: 1,
        nombre_rifa: 'Rifa 1',
        nombre_ganador: 'Ganador 1',
        tike_ganador: 'Ticket 1',
        url: 'https://www.google.com',
        fecha: '2023-06-30'
    },
    {
        id: 2,
        nombre_rifa: 'Rifa 2',
        nombre_ganador: 'Ganador 2',
        tike_ganador: 'Ticket 2',
        url: 'https://www.google.com',
        fecha: '2023-06-30'
    },
    {
        id: 3,
        nombre_rifa: 'Rifa 3',
        nombre_ganador: 'Ganador 3',
        tike_ganador: 'Ticket 3',
        url: 'https://www.google.com',
        fecha: '2023-06-30'
    },
    {
        id: 4,
        nombre_rifa: 'Rifa 4',
        nombre_ganador: 'Ganador 4',
        tike_ganador: 'Ticket 4',
        url: 'https://www.google.com',
        fecha: '2023-06-30'
    },
    {
        id: 5,
        nombre_rifa: 'Rifa 5',
        nombre_ganador: 'Ganador 5',
        tike_ganador: 'Ticket 5',
        url: 'https://www.google.com',
        fecha: '2023-06-30'
    }
]


export const REPONSIVE_OPTIONS = [
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
];