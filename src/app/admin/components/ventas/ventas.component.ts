import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {
  esCelular: boolean = false

  tikesArray!: string[]|number[]
  tickets = [
    {
      nombre: 'Juan Carlos Marquez',
      correo: 'jc.marquez@gmail.com',
      numero: '04141234567',
      img: 'https://randomuser.me/api/portraits/men/1.jpg',
      estatus: 'pendiente',
      tckts: ['1234', '5678'],
      total: 100,
      fecha: new Date('2023-01-05').toLocaleDateString()
    },
    {
      nombre: 'Maria Elena Gomez',
      correo: 'maria.gomez@outlook.com',
      numero: '04149876543',
      img: 'https://randomuser.me/api/portraits/women/2.jpg',
      estatus: 'aprobado',
      tckts: ['1111', '6789'],
      total: 200,
      fecha: new Date('2023-01-06').toLocaleDateString()
    },
    {
      nombre: 'Carlos Alberto Rodriguez',
      correo: 'carlos.rodriguez@hotmail.com',
      numero: '04141239876',
      img: 'https://randomuser.me/api/portraits/men/3.jpg',
      estatus: 'pendiente',
      tckts: ['3456', '7890', '1245', '3861'],
      total: 150,
      fecha: new Date('2023-01-07').toLocaleDateString()
    },
    {
      nombre: 'Laura Daniela Sánchez',
      correo: 'laura.sanchez@gmail.com',
      numero: '04141234567',
      img: 'https://randomuser.me/api/portraits/women/4.jpg',
      estatus: 'aprobado',
      tckts: ['4567', '8901', '2345'],
      total: 300,
      fecha: new Date('2023-01-08').toLocaleDateString()
    },
    {
      nombre: 'Andrés José Pérez',
      correo: 'andres.perez@outlook.com',
      numero: '04149876543',
      img: 'https://randomuser.me/api/portraits/men/5.jpg',
      estatus: 'pendiente',
      tckts: ['5678', '9012', '4567'],
      total: 200,
      fecha: new Date('2023-01-09').toLocaleDateString()
    },
    {
      nombre: 'María del Carmen Gómez',
      correo: 'maria.gomez@hotmail.com',
      numero: '04141239876',
      img: 'https://randomuser.me/api/portraits/women/6.jpg',
      estatus: 'aprobado',
      tckts: ['6789', '0123', '8901'],
      total: 250,
      fecha: new Date('2023-01-10').toLocaleDateString()
    },
    {
      nombre: 'César Alejandro Martínez',
      correo: 'cesar.martinez@gmail.com',
      numero: '04141234567',
      img: 'https://randomuser.me/api/portraits/men/7.jpg',
      estatus: 'pendiente',
      tckts: ['7890', '1234', '5678'],
      total: 150,
      fecha: new Date('2023-01-11').toLocaleDateString()
    },
    {
      nombre: 'Sandra Patricia López',
      correo: 'sandra.lopez@outlook.com',
      numero: '04149876543',
      img: 'https://randomuser.me/api/portraits/women/8.jpg',
      estatus: 'aprobado',
      tckts: ['8901', '2345', '6789'],
      total: 300,
      fecha: new Date('2023-01-12').toLocaleDateString()
    },
    {
      nombre: 'Jorge Luis Díaz',
      correo: 'jorge.diaz@hotmail.com',
      numero: '04141239876',
      img: 'https://randomuser.me/api/portraits/men/9.jpg',
      estatus: 'pendiente',
      tckts: ['0123', '4567', '8901'],
      total: 200,
      fecha: new Date('2023-01-13').toLocaleDateString()
    },
    {
      nombre: 'Ana María García',
      correo: 'ana.garcia@gmail.com',
      numero: '04141234567',
      img: 'https://randomuser.me/api/portraits/women/10.jpg',
      estatus: 'aprobado',
      tckts: ['2345', '6789', '0123'],
      total: 250,
      fecha: new Date('2023-01-14').toLocaleDateString()
    },
    {
      nombre: 'Pedro José Pérez',
      correo: 'pedro.perez@outlook.com',
      numero: '04149876543',
      img: 'https://randomuser.me/api/portraits/men/11.jpg',
      estatus: 'pendiente',
      tckts: ['3456', '7890', '4567'],
      total: 150,
      fecha: new Date('2023-01-15').toLocaleDateString()
    },
    {
      nombre: 'María Teresa Sánchez',
      correo: 'maria.sanchez@hotmail.com',
      numero: '04141239876',
      img: 'https://randomuser.me/api/portraits/women/12.jpg',
      estatus: 'aprobado',
      tckts: ['5678', '9012', '0123'],
      total: 300,
      fecha: new Date('2023-01-16').toLocaleDateString()
    },
    {
      nombre: 'Juan Pablo Ramírez',
      correo: 'juan.ramirez@gmail.com',
      numero: '04141234567',
      img: 'https://randomuser.me/api/portraits/men/13.jpg',
      estatus: 'pendiente',
      tckts: ['6789', '2345', '5678'],
      total: 200,
      fecha: new Date('2023-01-17').toLocaleDateString()
    },
    {
      nombre: 'Luis Alfredo Gómez',
      correo: 'luis.gomez@outlook.com',
      numero: '04149876543',
      img: 'https://randomuser.me/api/portraits/men/14.jpg',
      estatus: 'aprobado',
      tckts: ['8901', '4567', '9012'],
      total: 250,
      fecha: new Date('2023-01-18').toLocaleDateString()
    },
    {
      nombre: 'Ana Sofía López',
      correo: 'ana.lopez@hotmail.com',
      numero: '04141239876',
      img: 'https://randomuser.me/api/portraits/women/15.jpg',
      estatus: 'pendiente',
      tckts: ['0123', '1234', '7890'],
      total: 150,
      fecha: new Date('2023-01-19').toLocaleDateString()
    },
    {
      nombre: 'Rodrigo José Pérez',
      correo: 'rodrigo.perez@gmail.com',
      numero: '04141234567',
      img: 'https://randomuser.me/api/portraits/men/16.jpg',
      estatus: 'aprobado',
      tckts: ['4567', '8901', '2345'],
      total: 300,
      fecha: new Date('2023-01-20').toLocaleDateString()
    },
    {
      nombre: 'María del Carmen Díaz',
      correo: 'maria.diaz@outlook.com',
      numero: '04149876543',
      img: 'https://randomuser.me/api/portraits/women/17.jpg',
      estatus: 'pendiente',
      tckts: ['7890', '5678', '9012'],
      total: 200,
      fecha: new Date('2023-01-21').toLocaleDateString()
    },
    {
      nombre: 'César Augusto Gómez',
      correo: 'cesar.gomez@hotmail.com',
      numero: '04141239876',
      img: 'https://randomuser.me/api/portraits/men/18.jpg',
      estatus: 'aprobado',
      tckts: ['8901', '0123', '5678'],
      total: 250,
      fecha: new Date('2023-01-22').toLocaleDateString()
    },
    {
      nombre: 'Laura Daniela Sánchez',
      correo: 'laura.sanchez@gmail.com',
      numero: '04141234567',
      img: 'https://randomuser.me/api/portraits/women/19.jpg',
      estatus: 'pendiente',
      tckts: ['6789', '4567', '0123'],
      total: 150,
      fecha: new Date('2023-01-23').toLocaleDateString()
    },
    {
      nombre: 'Jorge Luis Díaz',
      correo: 'jorge.diaz@outlook.com',
      numero: '04149876543',
      img: 'https://randomuser.me/api/portraits/men/20.jpg',
      estatus: 'aprobado',
      tckts: ['9012', '8901', '4567'],
      total: 300,
      fecha: new Date('2023-01-24').toLocaleDateString()
    }
  ];

  columnas: any[] = [
    { key: 'nombre', label: 'Nombre', activa: true, id: 'nombre' },
    { key: 'numero', label: 'Teléfono', activa: true, id: 'numero' },
    { key: 'correo', label: 'Correo', activa: true, id: 'correo' },
    { key: 'tckts', label: 'Tickets', activa: true, id: 'tckts' },
    { key: 'pago', label: 'Pago', activa: true, id: 'pago' },
    { key: 'estatus', label: 'Estatus', activa: true, id: 'estatus' },
    { key: 'total', label: 'Total', activa: true, id: 'total' },
    { key: 'fecha', label: 'Fecha', activa: true, id: 'fecha' },
    { key: 'accion', label: 'Acción', activa: true, id: 'accion' }
  ];

  toggleColumna(col: any): void {
    col.activa = !col.activa;
  }

  ngOnInit() {
    this.onResize()
  }
  filterGlobal(event: Event, dt: any) {
    const value = (event.target as HTMLInputElement).value;
    dt.filterGlobal(value, 'contains');
  }

  @HostListener('window:resize')
  /**
   * Actualiza la variable esCelular cada vez que se redimensiona la ventana
   * para poder mostrar u ocultar el componente de imagen en el header
   * seg n sea necesario.
   */
  onResize() {
    this.esCelular = window.innerWidth < 768;
  }

  mostrarTickets(tickets: string[]|number[], overlay: any, event: MouseEvent): void {
    this.tikesArray = tickets

    // Muestra el overlay
    overlay.toggle(event);
  }

}
